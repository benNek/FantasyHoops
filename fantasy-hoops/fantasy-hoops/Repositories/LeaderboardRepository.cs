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
            DateTime date = CommonFunctions.GetDate(type);

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
                        .Where(y => y.Date >= date)
                        .Select(y => y.FP).Sum()
                })
                .Where(x => x.FP > 0)
                .OrderByDescending(x => x.FP)
                .Skip(from)
                .Take(limit);
        }

        public IEnumerable<object> GetUserLeaderboard(int from, int limit, string type)
        {
            DateTime date = CommonFunctions.GetDate(type);

            return _context.Users
                .Select(x => new
                {
                    x.Id,
                    x.UserName,
                    Score = x.Lineups
                        .Where(y => y.Date >= date)
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

            DateTime date = CommonFunctions.GetDate(type);

            return friendsOnly
                .Select(x => new
                {
                    x.Id,
                    x.UserName,
                    Score = x.Lineups
                    .Where(y => y.Date >= date)
                    .Select(y => y.FP).Sum()
                })
                .Where(y => y.Score > 0)
                .OrderByDescending(x => x.Score)
                .Skip(from)
                .Take(limit);
        }

    }
}
