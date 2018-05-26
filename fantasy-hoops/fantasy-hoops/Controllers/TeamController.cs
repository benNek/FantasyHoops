using System;
using System.Collections.Generic;
using System.Linq;
using fantasy_hoops.Database;
using fantasy_hoops.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class TeamController : Controller
    {

        private readonly GameContext _context;
        private readonly TeamRepository _repository;

        public TeamController()
        {
            _context = new GameContext();
            _repository = new TeamRepository(_context);
        }

        [HttpGet]
        public IEnumerable<Object> Get()
        {
            return _repository.GetTeams().Select(x => new
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
            var team = _repository.GetTeam(id);
            if (team == null)
                return NotFound(String.Format("Team with id {0} has not been found!", id));
            return Ok(team);
        }

    }
}