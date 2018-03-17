using System;
using System.Collections.Generic;
using System.Linq;
using fantasy_hoops.Database;
using fantasy_hoops.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class InjuriesController : Controller
    {

        private readonly GameContext context;

        public InjuriesController()
        {
            context = new GameContext();
        }

        [HttpGet]
        public IEnumerable<Object> Get()
        {
            return context.Injuries
                .Select(x => new {
                    x.InjuryID,
                    date = x.Date.ToString("yyyy-MM-dd"),
                    Player = new {
                        x.Player.NbaID,
                        x.Player.FirstName,
                        x.Player.LastName,
                        x.Player.Position,
                        Team = new {
                            x.Player.Team.NbaID,
                            x.Player.Team.City,
                            x.Player.Team.Name,
                            x.Player.Team.Color
                        }
                    },
                    x.Status,
                    x.Injury,
                    x.Title,
                    x.Description,
                    x.Link})
                    .ToList();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var injury = context.Injuries.Where(x => x.InjuryID == id).ToList().FirstOrDefault();
            if (injury == null)
            {
                var obj = new JObject();
                obj.Add("error", String.Format("Injury with id {0} has not been found!", id));
                return NotFound(obj);
            }
            return Ok(injury);
        }
    }
}