using fantasy_hoops.Database;
using fantasy_hoops.Models;
using fantasy_hoops.Models.Notifications;
using fantasy_hoops.Models.ViewModels;
using fantasy_hoops.Repositories;
using fantasy_hoops.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class LineupController : Controller
    {

        public readonly int MAX_PRICE = 300;

        private readonly GameContext _context;
        private readonly LineupService _service;
        private readonly LineupRepository _repository;

        public LineupController()
        {
            _context = new GameContext();
            _service = new LineupService(_context);
            _repository = new LineupRepository(_context);
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

        [HttpPost("demo/submit")]
        public IActionResult DEMOSubmitLineup([FromBody]SubmitLineupViewModel model)
        {
            if (_repository.GetLineupPrice(model) > MAX_PRICE)
                return StatusCode(422, "Lineup price exceeds the budget! Lineup was not submitted.");
            if (!PlayerSeed.PLAYER_POOL_DATE.Equals(Database.NextGame.NEXT_GAME))
                return StatusCode(500, "Player pool not updated! Try again in a moment.");

            _service.SubmitLineup(model);

            _context.GameScoreNotifications.Add(new GameScoreNotification
            {
                UserID = model.UserID,
                DateCreated = DateTime.UtcNow,
                ReadStatus = false,
                Score = new Random().Next(1, 200)
            });

            _context.SaveChanges();

            return Ok("Demo Lineup was updated successfully");
        }

        [HttpPost("demo/injury")]
        public IActionResult DemoInjury([FromBody]SubmitLineupViewModel model)
        {
            Random random = new Random();
            int pos = random.Next(1, 5);
            if (pos == 1)
                AddInjury(model.PgID, model.UserID);
            if (pos == 2)
                AddInjury(model.SgID, model.UserID);
            if (pos == 3)
                AddInjury(model.SfID, model.UserID);
            if (pos == 4)
                AddInjury(model.PfID, model.UserID);
            else
                AddInjury(model.CID, model.UserID);
            return Ok("Demo injury added");
        }

        private void AddInjury(int playerID, String userID)
        {
            var sth = playerID;
            var inj = new InjuryNotification
            {
                UserID = userID,
                ReadStatus = false,
                DateCreated = DateTime.UtcNow,
                PlayerID = playerID,
                InjuryStatus = "Out",
                InjuryDescription = "Demo injury notification"
            };
            _context.InjuryNotifications.Add(inj);
            _context.SaveChanges();
        }

    }
}
