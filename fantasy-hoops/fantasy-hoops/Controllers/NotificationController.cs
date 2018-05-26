using System;
using fantasy_hoops.Database;
using fantasy_hoops.Models.ViewModels;
using fantasy_hoops.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class NotificationController : Controller
    {

        private readonly GameContext context;
        private readonly NotificationRepository _repository;

        public NotificationController()
        {
            context = new GameContext();
            _repository = new NotificationRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_repository.GetAllNotifications());
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id, int start = 0, int count = 0)
        {
            var notifications = _repository.GetNotifications(id, start, count);

            if (notifications == null)
                return NotFound(new { error = String.Format("User with id {0} do not have any notifications!", id) });
            return Ok(notifications);
        }

        [HttpPost("toggle")]
        public IActionResult ToggleNotification([FromBody]NotificationViewModel model)
        {
            _repository.ReadNotification(model);
            return Ok();
        }

        [HttpPost("readall/{id}")]
        public IActionResult ReadAll(string id)
        {
            _repository.ReadAllNotifications(id);
            return Ok();
        }
    }
}