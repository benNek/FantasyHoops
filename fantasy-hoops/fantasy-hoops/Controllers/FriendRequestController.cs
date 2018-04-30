using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using fantasy_hoops.Database;
using fantasy_hoops.Models;
using fantasy_hoops.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class FriendRequestController : Controller
    {

        private readonly GameContext _context;

        public FriendRequestController()
        {
            _context = new GameContext();
        }

        [HttpPost("status")]
        public IActionResult GetStatus([FromBody]FriendRequestViewModel model)
        {
            var request = _context.FriendRequests
                .Where(x => x.SenderID.Equals(model.SenderID) && x.ReceiverID.Equals(model.ReceiverID))
                .FirstOrDefault();

            if (request == null)
            {
                request = _context.FriendRequests
                    .Where(x => x.SenderID.Equals(model.ReceiverID) && x.ReceiverID.Equals(model.SenderID))
                    .FirstOrDefault();
                if (request == null)
                    return Ok(-1);
                if(request.Status == RequestStatus.PENDING)
                    return Ok(200);
                return Ok(request.Status);
            }
            return Ok(request.Status);
        }

        [HttpPost("send")]
        public async Task<IActionResult> Send([FromBody]FriendRequestViewModel model)
        {
            var request = _context.FriendRequests
                .Where(x => x.SenderID.Equals(model.SenderID) && x.ReceiverID.Equals(model.ReceiverID))
                .FirstOrDefault();

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
                request.Date = DateTime.UtcNow;
                request.Status = RequestStatus.PENDING;
            }
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

            await _context.SaveChangesAsync();
            return Ok("Friend request has been accepted.");
        }

        [HttpPost("cancel")]
        public async Task<IActionResult> Cancel([FromBody]FriendRequestViewModel model)
        {
            var request = _context.FriendRequests
                .Where(x => x.SenderID.Equals(model.SenderID) && x.ReceiverID.Equals(model.ReceiverID))
                .FirstOrDefault();

            if(request == null)
                return NotFound("Friend request has not been found!");

            request.Date = DateTime.UtcNow;
            request.Status = RequestStatus.CANCELED;

            await _context.SaveChangesAsync();
            return Ok("Friend request has been sent canceled.");
        }

        [HttpPost("remove")]
        public async Task<IActionResult> Remove([FromBody] FriendRequestViewModel model)
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
            await _context.SaveChangesAsync();
            return Ok("Friend has been removed successfully.");
        }

    }
}