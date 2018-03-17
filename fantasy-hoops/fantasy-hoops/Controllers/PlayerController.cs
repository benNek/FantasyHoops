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
    public class PlayerController : Controller
    {

        private readonly GameContext context;

        public PlayerController()
        {
            context = new GameContext();
        }

        [HttpGet]
        public IEnumerable<Object> Get()
        {
            return context.Players.Select(x => new { x.FirstName, x.LastName, id = x.NbaID, x.Price, x.Position, TeamColor = x.Team.Color, x.FPPG }).ToList();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var player = context.Players.Where(x => x.NbaID == id).ToList().FirstOrDefault();
            if (player == null)
            {
                var obj = new JObject();
                obj.Add("error", String.Format("Player with id {0} has not been found!", id));
                return NotFound(obj);
            }
            return Ok(player);
        }
    }
}