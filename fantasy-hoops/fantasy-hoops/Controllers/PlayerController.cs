using System;
using System.Collections.Generic;
using System.Linq;
using fantasy_hoops.Database;
using fantasy_hoops.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class PlayerController : Controller
    {

        private readonly PlayerRepository _repository;

        public PlayerController()
        {
            _repository = new PlayerRepository(new GameContext());
        }

        [HttpGet]
        public IEnumerable<Object> Get()
        {
            return _repository.GetActivePlayers().ToList();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var player = _repository.GetPlayer(id)
                .FirstOrDefault();
            if (player == null)
                return NotFound(String.Format("Player with id {0} has not been found!", id));
            return Ok(player);
        }
    }
}