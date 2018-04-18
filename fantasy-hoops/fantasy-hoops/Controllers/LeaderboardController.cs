using fantasy_hoops.Database;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class LeaderboardController : Controller
    {
        private readonly GameContext context;

        public LeaderboardController()
        {
            context = new GameContext();
        }

        [HttpGet("user")]
        public IEnumerable<Object> GetUserLeaderboard(int from = 0, int limit = 10)
        {
            return context.UserPlayers
                .Where(x => x.Date.Equals(DateTime.Today.AddDays(-1)))
                .Select(x => new {
                    x.UserID,
                    x.Date,
                    Score = context.UserPlayers.Where(y => y.Date.Equals(x.Date) && y.UserID.Equals(x.UserID)).Select(y => y.FP).Sum(),
                    x.User.UserName
                })
                .Distinct()
                .OrderByDescending(x => x.Score)
                .Skip(from)
                .Take(limit)
                .ToList();
        }

        [HttpGet("player")]
        public IEnumerable<Object> GetPlayerLeaderboard(int from = 0, int limit = 10)
        {
            return context.Stats
                .Where(x => x.Date.Equals(DateTime.Today.AddDays(-1)))
                .Select(x => new
                {
                    x.PlayerID,
                    x.Player.FirstName,
                    x.Player.LastName,
                    x.Player.Position,
                    x.FP
                })
                .OrderByDescending(x => x.FP)
                .Skip(from)
                .Take(limit)
                .ToList();
        }
    }
}
