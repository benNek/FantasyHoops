using System;
using System.Collections.Generic;
using System.Linq;
using fantasy_hoops.Database;
using fantasy_hoops.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class GSNotificationController : Controller
    {

        private readonly GameContext context;

        public GSNotificationController()
        {
            context = new GameContext();
        }

        [HttpGet]
        public IEnumerable<Object> Get()
        {
            return context.GSNotifications
                .Select(x => new
                {
                    x.NotificationID,
                    x.DateCreated,
                    x.ReadStatus,
                    x.Score,
                    x.UserID
                })
                    .OrderByDescending(y => y.DateCreated)
                    .ToList();
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var userNotifications = context.GSNotifications
                .Select(x => new
                {
                    x.NotificationID,
                    x.DateCreated,
                    x.ReadStatus,
                    x.Score,
                    x.UserID
                })
            .Where(y => y.UserID == id)
            .OrderByDescending(d => d.DateCreated)
            .ToList();

            if (userNotifications == null)
                return NotFound(new { error = String.Format("User with id {0} do not have any notifications!", id) });
            return Ok(userNotifications);
        }

        [HttpPost("toggle")]
        public IActionResult ToggleNotification([FromBody]GSNotificationViewModel model)
        {
            context.GSNotifications
                .Where(x => x.NotificationID == model.NotificationID
                        && x.UserID.Equals(model.UserID))
                .FirstOrDefault()
                .ReadStatus = true;

            context.SaveChanges();
            return Ok();
        }

        [HttpPost("readall/{id}")]
        public IActionResult ReadAll(string id)
        {
            var userNotifications = context.GSNotifications
                .Where(x => x.UserID.Equals(id))
                .ToList();
            foreach (var notification in userNotifications)
                notification.ReadStatus = true;

            context.SaveChanges();
            return Ok();
        }
    }
}