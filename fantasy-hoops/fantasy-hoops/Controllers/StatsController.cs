using fantasy_hoops.Database;
using fantasy_hoops.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class StatsController : Controller
    {

        private readonly GameContext context;
        private readonly StatsRepository _repository;

        public StatsController()
        {
            context = new GameContext();
            _repository = new StatsRepository(context);
        }

        [HttpGet]
        public IEnumerable<Object> Get()
        {
            return _repository.GetStats().ToList();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id, int start = 0, int count = 10)
        {
            var player = _repository.GetStats(id, start, count).FirstOrDefault();
            if (player == null)
                return NotFound(String.Format("Player with id {0} has not been found!", id));
            return Ok(player);
        }
    }
}
