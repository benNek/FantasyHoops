using fantasy_hoops.Database;
using fantasy_hoops.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace fantasy_hoops.Repositories
{
    public class LeaderboardRepository : ILeaderboardRepository
    {

        private readonly GameContext _context;

        public LeaderboardRepository(GameContext context)
        {
            _context = context;
        }

        public IEnumerable<object> GetPlayerLeaderboard(int from, int limit, string type)
        {
            DateTime date = GetDate(type);

            return _context.Players
                .Select(x => new
                {
                    x.PlayerID,
                    x.NbaID,
                    x.FirstName,
                    x.LastName,
                    x.Position,
                    teamColor = x.Team.Color,
                    FP = x.Stats
                        .Where(y => y.PlayerID.Equals(x.PlayerID) && y.Date >= date)
                        .Select(y => y.FP).Sum()
                })
                .Where(x => x.FP > 0)
                .OrderByDescending(x => x.FP)
                .Skip(from)
                .Take(limit);
        }

        public IEnumerable<object> GetUserLeaderboard(int from, int limit, string type)
        {
            DateTime date = GetDate(type);

            return _context.Users
                .Select(x => new
                {
                    x.Id,
                    x.UserName,
                    Score = x.Lineups
                        .Where(y => y.UserID.Equals(x.Id) && y.Date >= date)
                        .Select(y => y.FP).Sum()
                })
                .Where(y => y.Score > 0)
                .OrderByDescending(x => x.Score)
                .Skip(from)
                .Take(limit);
        }

        public IEnumerable<object> GetFriendsLeaderboard(string id, int from, int limit, string type)
        {
            var loggedInUser = _context.Users.Where(u => u.Id.Equals(id));
            var friendsOnly = _context.FriendRequests
                .Include(u => u.Sender)
                .Where(f => f.ReceiverID.Equals(loggedInUser.FirstOrDefault().Id) && f.Status == Models.RequestStatus.ACCEPTED)
                .Select(u => u.Sender)
                .Union(_context.FriendRequests
                .Include(u => u.Receiver)
                .Where(f => f.SenderID.Equals(loggedInUser.FirstOrDefault().Id) && f.Status == Models.RequestStatus.ACCEPTED)
                .Select(u => u.Receiver)).Concat(loggedInUser);

            DateTime date = GetDate(type);

            return friendsOnly
                .Select(x => new
                {
                    x.Id,
                    x.UserName,
                    Score = x.Lineups
                    .Where(y => y.UserID.Equals(x.Id) && y.Date >= date)
                    .Select(y => y.FP).Sum()
                })
                .Where(y => y.Score > 0)
                .OrderByDescending(x => x.Score)
                .Skip(from)
                .Take(limit);
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
            if (type.Equals("monthly"))
            {
                int dayOffset = dayOfMonth == 1 ? DaysInMonth() : dayOfMonth - 1;
                return easternDate.AddDays(-dayOffset);
            }
            return NextGame.PREVIOUS_GAME;
        }

    }
}
