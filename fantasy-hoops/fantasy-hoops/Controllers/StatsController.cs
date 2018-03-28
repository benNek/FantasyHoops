using fantasy_hoops.Database;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class StatsController : Controller
    {

        private readonly GameContext context;

        public StatsController()
        {
            context = new GameContext();
        }

        [HttpGet]
        public IEnumerable<Object> Get()
        {
            return context.Players
                .Select(x => new
                {
                    x.PlayerID,
                    x.NbaID,
                    x.FirstName,
                    x.LastName,
                    x.Position,
                    Games = context.Stats.Where(s => s.PlayerID == x.PlayerID)
                        .Select(s => new
                        {
                            s.StatsID,
                            s.Date,
                            s.PTS,
                            s.FGM,
                            s.FGA,
                            s.FTM,
                            s.FTA,
                            s.DREB,
                            s.OREB,
                            s.AST,
                            s.STL,
                            s.BLK,
                            s.TOV,
                            s.FLS,
                            s.GS,
                            s.FP
                        })
                        .OrderByDescending(s => s.Date)
                })
                .ToList();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var player = context.Players
                .Where(x => x.NbaID == id)
                .Select(x => new
                {
                    x.PlayerID,
                    x.NbaID,
                    x.FirstName,
                    x.LastName,
                    x.Position,
                    Games = context.Stats.Where(s => s.PlayerID == x.PlayerID)
                        .Select(s => new
                        {
                            s.StatsID,
                            s.Date,
                            s.PTS,
                            s.FGM,
                            s.FGA,
                            s.FTM,
                            s.FTA,
                            s.DREB,
                            s.OREB,
                            s.AST,
                            s.STL,
                            s.BLK,
                            s.TOV,
                            s.FLS,
                            s.GS,
                            s.FP
                        })
                        .OrderByDescending(s => s.Date)
                })
                .ToList().FirstOrDefault();
            if (player == null)
                return NotFound(String.Format("Player with id {0} has not been found!", id));
            return Ok(player);
        }
    }
}
