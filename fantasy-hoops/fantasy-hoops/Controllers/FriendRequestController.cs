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

        [HttpPost("send")]
        public async Task<IActionResult> SendRequest([FromBody]FriendRequestViewModel model)
        {
            var request = new FriendRequest
            {
                SenderID = model.SenderID,
                ReceiverID = model.ReceiverID,
                Date = DateTime.UtcNow,
                Status = RequestStatus.PENDING
            };
            _context.FriendRequests.Add(request);
            await _context.SaveChangesAsync();

            return Ok("Friend request has been sent successfully.");
        }

    }
}