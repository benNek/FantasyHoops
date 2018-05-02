﻿using fantasy_hoops.Database;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

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

        [HttpGet("player")]
        public IEnumerable<Object> GetPlayerLeaderboard(int from = 0, int limit = 10)
        {
            return context.Stats
                .Where(x => x.Date.Equals(NextGame.NEXT_GAME))
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


        [HttpGet("user")]
        public IEnumerable<Object> GetMonthlyUserLeaderboard(int from = 0, int limit = 10, string type = "weekly")
        {
            DateTime date = NextGame.PREVIOUS_LAST_GAME.AddDays(-7);
            if (type.Equals("daily"))
            {
                date = NextGame.PREVIOUS_LAST_GAME;
            }
            else if (type.Equals("monthly"))
            {
                date = NextGame.PREVIOUS_LAST_GAME.AddDays(-30);
            }
            return context.Users.Select(x => new {
                x.Id,
                x.UserName,
                Score = context.Lineups
                    .Where(y => y.UserID.Equals(x.Id) && y.Date >= date)
                    .Select(y => y.FP).Sum()
            })
            .OrderByDescending(x => x.Score)
            .Skip(from)
            .Take(limit)
            .ToList();
        }
    }
}
