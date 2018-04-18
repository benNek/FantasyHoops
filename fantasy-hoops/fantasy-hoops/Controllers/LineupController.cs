using fantasy_hoops.Database;
using fantasy_hoops.Models;
using fantasy_hoops.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class LineupController : Controller
    {
        private readonly GameContext context;

        public LineupController()
        {
            context = new GameContext();
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var players = context.UserPlayers.Where(x => x.UserID.Equals(id) && x.Date == Database.NextGame.NEXT_GAME).Select(x => new
            {
                id = x.Player.NbaID,
                firstName = x.Player.FirstName,
                lastName = x.Player.LastName,
                position = x.Player.Position,
                price = x.Player.Price,
                fppg = x.Player.FPPG,
                playerId = x.PlayerID,
                teamColor = x.Player.Team.Color
            }).ToList();
            return Ok(players);
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitLineup([FromBody]SumbitLineupViewModel model)
        {
            bool updating = context.UserPlayers.Where(x => x.UserID.Equals(model.UserID) && x.Date == Database.NextGame.NEXT_GAME).Any();

            if (!updating)
            {
                var pg = new UserPlayers
                {
                    UserID = model.UserID,
                    PlayerID = model.PgID,
                    Position = "PG",
                    Date = Database.NextGame.NEXT_GAME
                };
                context.UserPlayers.Add(pg);

                var sg = new UserPlayers
                {
                    UserID = model.UserID,
                    PlayerID = model.SgID,
                    Position = "SG",
                    Date = Database.NextGame.NEXT_GAME
                };
                context.UserPlayers.Add(sg);

                var sf = new UserPlayers
                {
                    UserID = model.UserID,
                    PlayerID = model.SfID,
                    Position = "SF",
                    Date = Database.NextGame.NEXT_GAME
                };
                context.UserPlayers.Add(sf);

                var pf = new UserPlayers
                {
                    UserID = model.UserID,
                    PlayerID = model.PfID,
                    Position = "PF",
                    Date = Database.NextGame.NEXT_GAME
                };
                context.UserPlayers.Add(pf);

                var c = new UserPlayers
                {
                    UserID = model.UserID,
                    PlayerID = model.CID,
                    Position = "C",
                    Date = Database.NextGame.NEXT_GAME
                };
                context.UserPlayers.Add(c);
            }

            else
            {
                var pg = context.UserPlayers.Where(x => x.UserID.Equals(model.UserID) && x.Position.Equals("PG")).FirstOrDefault();
                pg.PlayerID = model.PgID;
                pg.FP = 0.0;

                var sg = context.UserPlayers.Where(x => x.UserID.Equals(model.UserID) && x.Position.Equals("SG")).FirstOrDefault();
                sg.PlayerID = model.SgID;
                sg.FP = 0.0;

                var sf = context.UserPlayers.Where(x => x.UserID.Equals(model.UserID) && x.Position.Equals("SF")).FirstOrDefault();
                sf.PlayerID = model.SfID;
                sf.FP = 0.0;

                var pf = context.UserPlayers.Where(x => x.UserID.Equals(model.UserID) && x.Position.Equals("PF")).FirstOrDefault();
                pf.PlayerID = model.PfID;
                pf.FP = 0.0;

                var c = context.UserPlayers.Where(x => x.UserID.Equals(model.UserID) && x.Position.Equals("C")).FirstOrDefault();
                c.PlayerID = model.CID;
                c.FP = 0.0;
            }

            await context.SaveChangesAsync();

            return Ok("Lineup was updated successfully");
        }

        [HttpGet("nextGame")]
        public IActionResult NextGame()
        {
            return Ok(new { nextGame = Database.NextGame.NEXT_GAME_CLIENT,
                            serverTime = DateTime.Now
            });
        }
    }
}
