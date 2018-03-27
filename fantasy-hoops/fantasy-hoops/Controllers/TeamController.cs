using System;
using System.Collections.Generic;
using System.Linq;
using fantasy_hoops.Database;
using Microsoft.AspNetCore.Mvc;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class TeamController : Controller
    {

        private readonly GameContext context;

        public TeamController()
        {
            context = new GameContext();
        }

        [HttpGet]
        public IEnumerable<Object> Get()
        {
            return context.Teams.Select(x => new
            {
                x.TeamID,
                x.NbaID,
                x.City,
                x.Name,
                x.Color
            }).OrderBy(x => x.Name)
            .ToList();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var team = context.Teams.Where(x => x.NbaID == id).ToList().FirstOrDefault();
            if (team == null)
                return NotFound(new { error = String.Format("Team with id {0} has not been found!", id) });
            return Ok(team);
        }
    }
}