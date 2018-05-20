using fantasy_hoops.Database;
using fantasy_hoops.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public IEnumerable<Object> GetPlayerLeaderboard(int from = 0, int limit = 10, string type = "weekly")
        {
            DateTime date = GetDate(type);

            return context.Players
                .Select(x => new
                {
                    x.PlayerID,
                    x.NbaID,
                    x.FirstName,
                    x.LastName,
                    x.Position,
                    teamColor = x.Team.Color,
                    FP = Math.Round(context.Stats
                        .Where(y => y.PlayerID.Equals(x.PlayerID) && y.Date >= date)
                        .Select(y => y.FP).Sum(), 1)
                })
                .Where(x => x.FP > 0)
                .OrderByDescending(x => x.FP)
                .Skip(from)
                .Take(limit)
                .ToList();
        }

        private int DaysInMonth()
        {
            int year = CommonFunctions.UTCToEastern(DateTime.UtcNow).Year;
            int month = CommonFunctions.UTCToEastern(DateTime.UtcNow).Month;
            return DateTime.DaysInMonth(year, month);
        }

        private DateTime GetDate(string type)
        {
            DateTime easternDate = CommonFunctions.UTCToEastern(DateTime.UtcNow);
            int dayOfWeek = (int)CommonFunctions.UTCToEastern(DateTime.UtcNow).DayOfWeek;
            int dayOfMonth = CommonFunctions.UTCToEastern(DateTime.UtcNow).Day;

            if (type.Equals("weekly"))
            {
                int dayOffset = dayOfWeek == 1
                    ? 7
                    : dayOfWeek == 0 ? 6 : dayOfWeek - 1;

                return easternDate.AddDays(-dayOffset);
            }
            if(type.Equals("monthly"))
            {
                int dayOffset = dayOfMonth == 1 ? DaysInMonth() : dayOfMonth - 1;
                return easternDate.AddDays(-dayOffset);
            }
            return NextGame.PREVIOUS_GAME;
        }


        [HttpGet("user")]
        public IEnumerable<Object> GetMonthlyUserLeaderboard(int from = 0, int limit = 10, string type = "weekly")
        {

            DateTime date = GetDate(type);

            return context.Users.Select(x => new {
                x.Id,
                x.UserName,
                Score = Math.Round(context.Lineups
                    .Where(y => y.UserID.Equals(x.Id) && y.Date >= date)
                    .Select(y => y.FP).Sum(), 1)
            })
            .Where(y => y.Score > 0)
            .OrderByDescending(x => x.Score)
            .Skip(from)
            .Take(limit)
            .ToList();
        }

        [HttpGet("user/{id}")]
        public IEnumerable<Object> FriendsOnlyLeaderboard(string id, int from = 0, int limit = 10, string type = "weekly")
        {
            var loggedInUser = context.Users.Where(u => u.Id.Equals(id));
            var friendsOnly = context.FriendRequests
                .Include(u => u.Sender)
                .Where(f => f.ReceiverID.Equals(loggedInUser.FirstOrDefault().Id) && f.Status == Models.RequestStatus.ACCEPTED)
                .Select(u => u.Sender)
                .Union(context.FriendRequests
                .Include(u => u.Receiver)
                .Where(f => f.SenderID.Equals(loggedInUser.FirstOrDefault().Id) && f.Status == Models.RequestStatus.ACCEPTED)
                .Select(u => u.Receiver)).Concat(loggedInUser);

            DateTime date = GetDate(type);

            return friendsOnly
                .Select(x => new
                {
                    x.Id,
                    x.UserName,
                    Score = Math.Round(context.Lineups
                    .Where(y => y.UserID.Equals(x.Id) && y.Date >= date)
                    .Select(y => y.FP).Sum(), 1)
                })
            .Where(y => y.Score > 0)
            .OrderByDescending(x => x.Score)
            .Skip(from)
            .Take(limit)
            .ToList();
        }
    }
}
