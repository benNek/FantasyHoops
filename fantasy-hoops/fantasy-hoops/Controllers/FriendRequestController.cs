using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using fantasy_hoops.Database;
using fantasy_hoops.Models;
using fantasy_hoops.Models.Notifications;
using fantasy_hoops.Models.ViewModels;
using fantasy_hoops.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class FriendRequestController : Controller
    {

        private readonly GameContext _context;
        private FriendRepository _repository;

        public FriendRequestController()
        {
            _context = new GameContext();
            _repository = new FriendRepository();
        }

        [HttpPost("status")]
        public IActionResult GetStatus([FromBody]FriendRequestViewModel model)
        {
            RequestStatus status = _repository.GetStatus(model.ReceiverID, model.SenderID);
            switch(status)
            {
                case RequestStatus.NO_REQUEST:
                    return Ok(-1);
                case RequestStatus.PENDING_INCOMING:
                    return Ok(200);
                default:
                    return Ok(status);
            }
        }

        [HttpPost("send")]
        public async Task<IActionResult> Send([FromBody]FriendRequestViewModel model)
        {
            var request = _context.FriendRequests
                .Where(x => x.SenderID.Equals(model.SenderID) && x.ReceiverID.Equals(model.ReceiverID))
                .FirstOrDefault();

            if(request == null)
            {
                request = _context.FriendRequests
                    .Where(x => x.SenderID.Equals(model.ReceiverID) && x.ReceiverID.Equals(model.SenderID))
                    .FirstOrDefault();
            }

            // Adding a new request
            if (request == null)
            {
                request = new FriendRequest
                {
                    SenderID = model.SenderID,
                    ReceiverID = model.ReceiverID,
                    Date = DateTime.UtcNow,
                    Status = RequestStatus.PENDING
                };
                _context.FriendRequests.Add(request);
            }
            // Updating an existing one
            else
            {
                request.SenderID = model.SenderID;
                request.ReceiverID = model.ReceiverID;
                request.Date = DateTime.UtcNow;
                request.Status = RequestStatus.PENDING;
            }

            var notification = new FriendRequestNotification
            {
                UserID = model.ReceiverID,
                FriendID = model.SenderID,
                ReadStatus = false,
                DateCreated = DateTime.UtcNow,
                RequestMessage = "Sent you a friend request."
            };

            _context.FriendRequestNotifications.Add(notification);

            await _context.SaveChangesAsync();

            return Ok("Friend request has been sent successfully.");
        }

        [HttpPost("accept")]
        public async Task<IActionResult> Accept([FromBody]FriendRequestViewModel model)
        {
            var request = _context.FriendRequests
                .Where(x => x.SenderID.Equals(model.ReceiverID) && x.ReceiverID.Equals(model.SenderID))
                .FirstOrDefault();

            if (request == null)
                return NotFound("Friend request has not been found!");

            request.Date = DateTime.UtcNow;
            request.Status = RequestStatus.ACCEPTED;

            var notification = new FriendRequestNotification
            {
                UserID = model.ReceiverID,
                FriendID = model.SenderID,
                ReadStatus = false,
                DateCreated = DateTime.UtcNow,
                RequestMessage = "Accepted your friend request."
            };
            _context.FriendRequestNotifications.Add(notification);

            notification = _context.FriendRequestNotifications.Where(x => x.UserID.Equals(model.SenderID) && x.FriendID.Equals(model.ReceiverID)).FirstOrDefault();
            if (notification != null)
            {
                _context.FriendRequestNotifications.Remove(notification);
            }

            await _context.SaveChangesAsync();
            return Ok("Friend request has been accepted.");
        }

        [HttpPost("cancel")]
        public IActionResult Cancel([FromBody]FriendRequestViewModel model)
        {
            var request = _context.FriendRequests
                .Where(x => x.SenderID.Equals(model.SenderID) && x.ReceiverID.Equals(model.ReceiverID))
                .FirstOrDefault();

            if (request == null)
                return NotFound("Friend request has not been found!");

            request.Date = DateTime.UtcNow;
            request.Status = RequestStatus.CANCELED;

            var notification = _context.FriendRequestNotifications.Where(x => x.UserID.Equals(model.ReceiverID) && x.FriendID.Equals(model.SenderID)).FirstOrDefault();
            if (notification != null)
            {
                _context.FriendRequestNotifications.Remove(notification);
            }

            _context.SaveChanges();
            return Ok("Friend request has been canceled.");
        }

        [HttpPost("remove")]
        public IActionResult Remove([FromBody] FriendRequestViewModel model)
        {
            var request = _context.FriendRequests
                .Where(x => x.SenderID.Equals(model.SenderID) && x.ReceiverID.Equals(model.ReceiverID))
                .FirstOrDefault();

            if (request == null)
            {
                request = _context.FriendRequests
                    .Where(x => x.SenderID.Equals(model.ReceiverID) && x.ReceiverID.Equals(model.SenderID))
                    .FirstOrDefault();
            }

            if(request == null)
            {
                return NotFound("Specified users are not friends!");
            }

            request.Date = DateTime.UtcNow;
            request.Status = RequestStatus.CANCELED;

            var notification = _context.FriendRequestNotifications.Where(x => x.UserID.Equals(model.ReceiverID) && x.FriendID.Equals(model.SenderID)).FirstOrDefault();
            if (notification != null)
            {
                _context.FriendRequestNotifications.Remove(notification);
            }

            notification = _context.FriendRequestNotifications.Where(x => x.UserID.Equals(model.SenderID) && x.FriendID.Equals(model.ReceiverID)).FirstOrDefault();
            if (notification != null)
            {
                _context.FriendRequestNotifications.Remove(notification);
            }

            _context.SaveChanges();
            return Ok("Friend has been removed successfully.");
        }

        [HttpGet("pending/{id}")]
        public IActionResult GetPendingRequests(String id)
        {
            var o = _repository.GetPendingRequests(id);
            /*
            var requests = _context.FriendRequests
                .Where(x => x.ReceiverID.Equals(id) && x.Status.Equals(RequestStatus.PENDING))
                .Select(x => new
                {
                    x.Sender.UserName,
                    x.Sender.Id
                })
                .ToList();
                */
            return Ok(requests);
        }

        [HttpGet("requests/{id}")]
        public IActionResult GetRequests(String id)
        {
            var requests = _context.FriendRequests
                .Where(x => x.SenderID.Equals(id) && x.Status.Equals(RequestStatus.PENDING))
                .Select(x => new
                {
                    x.Receiver.UserName,
                    x.Receiver.Id
                })
                .ToList();
            return Ok(requests);
        }

    }
}