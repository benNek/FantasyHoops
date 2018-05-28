using System;
using System.Linq;
using fantasy_hoops.Database;
using fantasy_hoops.Models;
using fantasy_hoops.Models.ViewModels;
using fantasy_hoops.Repositories;
using fantasy_hoops.Services;
using Microsoft.AspNetCore.Mvc;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class FriendRequestController : Controller
    {

        private readonly IFriendRepository _repository;
        private readonly IFriendService _service;

        public FriendRequestController()
        {
            GameContext context = new GameContext();
            _repository = new FriendRepository(context);
            _service = new FriendService(context);
        }

        public FriendRequestController(IFriendRepository repository, IFriendService service)
        {
            _repository = repository;
            _service = service;
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
        public IActionResult Send([FromBody]FriendRequestViewModel model)
        {
            _service.SendRequest(model);
            return Ok("Friend request has been sent successfully.");
        }

        [HttpPost("accept")]
        public IActionResult Accept([FromBody]FriendRequestViewModel model)
        {
            var request = _repository.GetRequest(model.ReceiverID, model.SenderID);
            if (request == null)
                return NotFound("Friend request has not been found!");

            _service.AcceptRequest(model, request);
            return Ok("Friend request has been accepted.");
        }

        [HttpPost("cancel")]
        public IActionResult Cancel([FromBody]FriendRequestViewModel model)
        {
            var request = _repository.GetRequest(model.SenderID, model.ReceiverID);
            if (request == null)
                return NotFound("Friend request has not been found!");

            _service.CancelRequest(model, request);
            return Ok("Friend request has been canceled.");
        }

        [HttpPost("remove")]
        public IActionResult Remove([FromBody] FriendRequestViewModel model)
        {
            var request = _repository.GetRequest(model.SenderID, model.ReceiverID);

            if (request == null)
                request = _repository.GetRequest(model.ReceiverID, model.SenderID);

            if(request == null)
                return NotFound("Users are not friends!");

            _service.RemoveRequest(model, request);
            return Ok("Friend has been removed successfully.");
        }

        [HttpGet("pending/{id}")]
        public IActionResult GetPendingRequests(String id)
        {
            var requests = _repository.GetPendingRequests(id).ToList();
            return Ok(requests);
        }

        [HttpGet("requests/{id}")]
        public IActionResult GetRequests(String id)
        {
            var requests = _repository.GetIncomingRequests(id).ToList();
            return Ok(requests);
        }

    }
}