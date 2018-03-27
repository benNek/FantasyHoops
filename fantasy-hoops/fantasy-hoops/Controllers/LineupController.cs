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
            var players = context.UserPlayers.Where(x => x.UserID.Equals(id)).Select(x => new
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
            bool updating = context.UserPlayers.Where(x => x.UserID.Equals(model.UserID)).Any();

            if (!updating)
            {
                var pg = new UserPlayers
                {
                    UserID = model.UserID,
                    PlayerID = model.PgID,
                    Position = "PG"
                };
                context.UserPlayers.Add(pg);

                var sg = new UserPlayers
                {
                    UserID = model.UserID,
                    PlayerID = model.SgID,
                    Position = "SG"
                };
                context.UserPlayers.Add(sg);

                var sf = new UserPlayers
                {
                    UserID = model.UserID,
                    PlayerID = model.SfID,
                    Position = "SF"
                };
                context.UserPlayers.Add(sf);

                var pf = new UserPlayers
                {
                    UserID = model.UserID,
                    PlayerID = model.PfID,
                    Position = "PF"
                };
                context.UserPlayers.Add(pf);

                var c = new UserPlayers
                {
                    UserID = model.UserID,
                    PlayerID = model.CID,
                    Position = "C"
                };
                context.UserPlayers.Add(c);

            }

            else
            {
                var pg = context.UserPlayers.Where(x => x.UserID.Equals(model.UserID) && x.Position.Equals("PG")).FirstOrDefault();
                pg.PlayerID = model.PgID;

                var sg = context.UserPlayers.Where(x => x.UserID.Equals(model.UserID) && x.Position.Equals("SG")).FirstOrDefault();
                sg.PlayerID = model.SgID;

                var sf = context.UserPlayers.Where(x => x.UserID.Equals(model.UserID) && x.Position.Equals("SF")).FirstOrDefault();
                sf.PlayerID = model.SfID;

                var pf = context.UserPlayers.Where(x => x.UserID.Equals(model.UserID) && x.Position.Equals("PF")).FirstOrDefault();
                pf.PlayerID = model.PfID;

                var c = context.UserPlayers.Where(x => x.UserID.Equals(model.UserID) && x.Position.Equals("C")).FirstOrDefault();
                c.PlayerID = model.CID;
            }

            await context.SaveChangesAsync();

            return Ok("Lineup was updated successfully");
        }
    }
}
