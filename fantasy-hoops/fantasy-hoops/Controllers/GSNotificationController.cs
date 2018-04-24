using System;
using System.Collections.Generic;
using System.Linq;
using fantasy_hoops.Database;
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
            var userNotifications = context.GSNotifications.Select(x => new
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
    }
}