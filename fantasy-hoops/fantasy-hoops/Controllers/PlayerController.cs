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
            return _repository.GetActivePlayers()
                .Select(x => new
                {
                    x.FirstName,
                    x.LastName,
                    id = x.NbaID,
                    playerId = x.PlayerID,
                    x.Price,
                    x.Position,
                    TeamColor = x.Team.Color,
                    x.FPPG,
                    injuryStatus = x.Status
                })
                .OrderByDescending(p => p.Price)
                .ToList();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var player = _repository.GetPlayer(id)
                .Select(x => new
                {
                    x.PlayerID,
                    x.NbaID,
                    x.FirstName,
                    x.LastName,
                    x.Number,
                    x.Position,
                    x.PTS,
                    x.REB,
                    x.AST,
                    x.STL,
                    x.BLK,
                    x.TOV,
                    x.FPPG,
                    x.Price,
                    injuryStatus = x.Status,
                    Team = new
                    {
                        x.TeamID,
                        x.Team.NbaID,
                        x.Team.Abbreviation,
                        x.Team.City,
                        x.Team.Name,
                        x.Team.Color
                    },
                }).ToList().FirstOrDefault();
            if (player == null)
                return NotFound(String.Format("Player with id {0} has not been found!", id));
            return Ok(player);
        }
    }
}