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
                    Team = new
                    {
                        x.TeamID,
                        x.Team.NbaID,
                        x.Team.Abbreviation,
                        x.Team.City,
                        x.Team.Name,
                        x.Team.Color
                    },
                    Games = context.Stats.Where(s => s.PlayerID == x.PlayerID)
                        .Select(s => new
                        {
                            s.StatsID,
                            s.Date,
                            Opponent = context.Teams.Where(t => t.NbaID == s.OppID)
                                .Select(t => new
                                {
                                    t.NbaID,
                                    t.Abbreviation
                                })
                                .FirstOrDefault(),
                            s.Score,
                            s.MIN,
                            s.FGM,
                            s.FGA,
                            s.FGP,
                            s.TPM,
                            s.TPA,
                            s.TPP,
                            s.FTM,
                            s.FTA,
                            s.FTP,
                            s.DREB,
                            s.OREB,
                            s.TREB,
                            s.AST,
                            s.BLK,
                            s.STL,
                            s.FLS,
                            s.TOV,
                            s.PTS,
                            s.GS,
                            s.FP,
                            s.Price
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
                    Team = new
                    {
                        x.TeamID,
                        x.Team.NbaID,
                        x.Team.Abbreviation,
                        x.Team.City,
                        x.Team.Name,
                        x.Team.Color
                    },
                    Games = context.Stats.Where(s => s.PlayerID == x.PlayerID)
                        .Select(s => new
                        {
                            s.StatsID,
                            s.Date,
                            Opponent = context.Teams.Where(t => t.NbaID == s.OppID)
                                .Select(t => new
                                {
                                    t.NbaID,
                                    t.Abbreviation
                                })
                                .FirstOrDefault(),
                            s.Score,
                            s.MIN,
                            s.FGM,
                            s.FGA,
                            s.FGP,
                            s.TPM,
                            s.TPA,
                            s.TPP,
                            s.FTM,
                            s.FTA,
                            s.FTP,
                            s.DREB,
                            s.OREB,
                            s.TREB,
                            s.AST,
                            s.BLK,
                            s.STL,
                            s.FLS,
                            s.TOV,
                            s.PTS,
                            s.GS,
                            s.FP,
                            s.Price
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
