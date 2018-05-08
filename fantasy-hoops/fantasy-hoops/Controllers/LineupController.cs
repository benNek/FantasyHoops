using fantasy_hoops.Database;
using fantasy_hoops.Models;
using fantasy_hoops.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
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
            var players = context.Lineups
                .Where(x => x.UserID.Equals(id) && x.Date == Database.NextGame.NEXT_GAME)
                .Select(x => new
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
            bool updating = context.Lineups
                .Where(x => x.UserID.Equals(model.UserID)
                        && x.Date == Database.NextGame.NEXT_GAME)
                .Any();

            // Checking if price sum is not higher than 300K
            int priceSum = context.Players.Where(pg => pg.PlayerID == model.PgID).Select(p => p.Price)
                .Union(context.Players.Where(sg => sg.PlayerID == model.SgID).Select(p => p.Price))
                .Union(context.Players.Where(sf => sf.PlayerID == model.SfID).Select(p => p.Price))
                .Union(context.Players.Where(pf => pf.PlayerID == model.PfID).Select(p => p.Price))
                .Union(context.Players.Where(c => c.PlayerID == model.CID).Select(p => p.Price))
                .Sum();

            if (priceSum > 300)
                return StatusCode(422, "Lineup price exceeds the budget! Lineup was not submitted.");

            // Checking if players' prices are correct
            if (context.Players.Where(pg => pg.PlayerID == model.PgID).Select(p => p.Price).FirstOrDefault() != model.PgPrice
                || context.Players.Where(sg => sg.PlayerID == model.SgID).Select(p => p.Price).FirstOrDefault() != model.SgPrice
                || context.Players.Where(sf => sf.PlayerID == model.SfID).Select(p => p.Price).FirstOrDefault() != model.SfPrice
                || context.Players.Where(pf => pf.PlayerID == model.PfID).Select(p => p.Price).FirstOrDefault() != model.PfPrice
                || context.Players.Where(c => c.PlayerID == model.CID).Select(p => p.Price).FirstOrDefault() != model.CPrice)
                return StatusCode(422, "Wrong player prices! Lineup was not submitted.");

            if (!updating)
            {
                Add(model.UserID, "PG", model.PgID);
                Add(model.UserID, "SG", model.SgID);
                Add(model.UserID, "SF", model.SfID);
                Add(model.UserID, "PF", model.PfID);
                Add(model.UserID, "C", model.CID);
            }
            else
            {
                Update(model.UserID, "PG", model.PgID);
                Update(model.UserID, "SG", model.SgID);
                Update(model.UserID, "SF", model.SfID);
                Update(model.UserID, "PF", model.PfID);
                Update(model.UserID, "C", model.CID);
            }

            await context.SaveChangesAsync();

            return Ok("Lineup was updated successfully");
        }

        [HttpGet("nextGame")]
        public IActionResult NextGame()
        {
            return Ok(new
            {
                nextGame = Database.NextGame.NEXT_GAME_CLIENT,
                serverTime = DateTime.Now
            });
        }

        public void Add(String UserID, String position, int id)
        {
            var player = new Lineup
            {
                UserID = UserID,
                PlayerID = id,
                Position = position,
                Date = Database.NextGame.NEXT_GAME,
                Calculated = false
            };
            context.Lineups.Add(player);
        }

        public void Update(String UserID, String position, int newId)
        {
            var player = context.Lineups
                    .Where(x => x.UserID.Equals(UserID)
                            && x.Position.Equals(position)
                            && x.Date == Database.NextGame.NEXT_GAME)
                    .FirstOrDefault();
            player.PlayerID = newId;
            player.FP = 0.0;
            player.Calculated = false;
        }
    }
}
