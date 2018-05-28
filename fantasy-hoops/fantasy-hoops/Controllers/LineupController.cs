using fantasy_hoops.Database;
using fantasy_hoops.Models.ViewModels;
using fantasy_hoops.Repositories;
using fantasy_hoops.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class LineupController : Controller
    {

        public readonly int MAX_PRICE = 300;

        private readonly LineupService _service;
        private readonly LineupRepository _repository;

        public LineupController()
        {
            GameContext context = new GameContext();
            _service = new LineupService(context);
            _repository = new LineupRepository(context);
        }

        [HttpGet("{id}")]
        public IActionResult Get(String id)
        {
            return Ok(_repository.GetLineup(id).ToList());
        }

        [HttpPost("submit")]
        public IActionResult SubmitLineup([FromBody]SubmitLineupViewModel model)
        {
            if(_repository.GetLineupPrice(model) > MAX_PRICE)
                return StatusCode(422, "Lineup price exceeds the budget! Lineup was not submitted.");
            if (!_repository.ArePricesCorrect(model))
                return StatusCode(422, "Wrong player prices! Lineup was not submitted.");
            if (!PlayerSeed.PLAYER_POOL_DATE.Equals(Database.NextGame.NEXT_GAME))
                return StatusCode(500, "Player pool not updated! Try again in a moment.");

            _service.SubmitLineup(model);

            return Ok("Lineup was updated successfully");
        }

        [HttpGet("nextGame")]
        public IActionResult NextGame()
        {
            return Ok(new
            {
                nextGame = Database.NextGame.NEXT_GAME_CLIENT,
                serverTime = DateTime.Now,
                playerPoolDate = PlayerSeed.PLAYER_POOL_DATE
            });
        }

    }
}
