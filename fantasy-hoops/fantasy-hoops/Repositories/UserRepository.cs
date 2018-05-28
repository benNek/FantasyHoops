using System;
using System.Linq;
using fantasy_hoops.Database;
using fantasy_hoops.Models;

namespace fantasy_hoops.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly GameContext _context;
        private readonly TeamRepository _teamRepository;

        public UserRepository(GameContext context)
        {
            _context = context;
            _teamRepository = new TeamRepository(_context);
        }

        public IQueryable<Object> GetProfile(string id)
        {
            User user = GetUser(id);

            Team team = _teamRepository.GetTeamById(user.FavoriteTeamId);
            if (team == null)
            {
                team = new Team()
                {
                    City = "Seattle",
                    Name = "Supersonics",
                    Color = "#FFC200"
                };
            }

            var activity = GetRecentActivity(id).ToList()
                .Where((x, index) => index % 5 == 0).ToList();
            int streak = GetStreak(id);
            double totalScore = GetWeeklyScore(id);
            int position = GetWeeklyRanking(id);

            var profile = _context.Users.Where(x => x.Id.Equals(id)).Select(x => new
            {
                x.Id,
                x.UserName,
                x.Email,
                x.Description,
                x.FavoriteTeamId,
                date = NextGame.NEXT_GAME,

                Team = new
                {
                    Name = team.City + " " + team.Name,
                    team.Color
                },
                RecentActivity = activity,
                streak,
                position,
                TotalScore = totalScore
            });
            return profile;
        }

        public User GetUser(string id)
        {
            return _context.Users
                .Where(x => x.Id.Equals(id))
                .FirstOrDefault();
        }

        public User GetUserByName(string username)
        {
            return _context.Users
                .Where(x => x.UserName.ToLower().Equals(username.ToLower()))
                .FirstOrDefault();
        }

        public IQueryable<Object> GetFriends(string id)
        {
            var friends = _context.FriendRequests
               .Where(x => x.ReceiverID.Equals(id) && x.Status.Equals(RequestStatus.ACCEPTED))
               .Select(x => new
               {
                   id = x.SenderID,
                   x.Sender.UserName,
                   Color = _context.Teams
                       .Where(t => t.TeamID == x.Sender.FavoriteTeamId)
                       .Select(t => t.Color)
                       .FirstOrDefault()
               })
               .Union(_context.FriendRequests
               .Where(x => x.SenderID.Equals(id) && x.Status.Equals(RequestStatus.ACCEPTED))
               .Select(x => new
               {
                  id = x.ReceiverID,
                  x.Receiver.UserName,
                  Color = _context.Teams
                     .Where(t => t.TeamID == x.Receiver.FavoriteTeamId)
                     .Select(t => t.Color)
                     .FirstOrDefault()
            }));

            return friends;
        }

        public IQueryable<Object> GetUserPool()
        {
            return _context.Users
                .Select(x => new
                {
                    x.UserName,
                    x.Id,
                    color = _context.Teams
                        .Where(y => y.TeamID == x.FavoriteTeamId)
                        .Select(y => y.Color)
                        .FirstOrDefault()
                })
                .OrderBy(x => x.UserName);
        }

        public bool UserExists(string username)
        {
            return _context.Users
                .Where(x => x.UserName.ToLower().Equals(username.ToLower()))
                .Any();
        }

        public bool EmailExists(string email)
        {
            return _context.Users
                .Where(x => x.Email.ToLower().Equals(email.ToLower()))
                .Any();
        }

        private IQueryable<Object> GetRecentActivity(string id)
        {
            // Getting all players that user has selected in recent 5 games
            var players = _context.Lineups
                .Where(x => x.UserID.Equals(id) && x.Date <= NextGame.PREVIOUS_GAME)
                .OrderByDescending(x => x.Date)
                .Select(x => new
                {
                    x.Player.NbaID,
                    x.Player.LastName,
                    x.Player.Position,
                    x.Player.Team.Color,
                    x.Date,
                    FP = _context.Lineups
                        .Where(y => y.PlayerID.Equals(x.PlayerID) && y.Date.Equals(x.Date))
                        .Select(y => y.FP)
                        .FirstOrDefault()
                })
                .Take(30)
                .ToList();

            // Getting 5 recent games
            var activity = _context.Lineups
                .Where(x => x.Calculated && x.UserID.Equals(id))
                .OrderByDescending(x => x.Date)
                .Select(x => new
                {
                    x.Date,
                    Score = Math.Round(_context.Lineups.Where(y => y.Date.Equals(x.Date) && y.UserID.Equals(x.UserID)).Select(y => y.FP).Sum(), 1),
                    players = players.Where(y => y.Date.Equals(x.Date)).ToList()
                })
                .Take(25);

            return activity;
        }

        private int GetStreak(string id)
        {
            //TODO Streak needs to be fixed
            int streak = 0;
            DateTime date = NextGame.NEXT_GAME;
            if (!NextGame.NEXT_GAME.Equals(new DateTime()))
                date = NextGame.NEXT_GAME.AddDays(-1);
            while (_context.Lineups.Where(x => x.UserID.Equals(id) && x.Date.DayOfYear.Equals(date.DayOfYear)).Any())
            {
                streak++;
                date = date.AddDays(-1);
            }
            return streak;
        }

        private double GetWeeklyScore(string id)
        {
            return _context.Lineups
                    .Where(x => x.UserID.Equals(id) && x.Date >= NextGame.PREVIOUS_LAST_GAME.AddDays(-7))
                    .Select(x => x.FP).Sum();
        }

        private int GetWeeklyRanking(string id)
        {
            var ranking = _context.Users.Select(x => new {
                x.Id,
                Score = _context.Lineups
                    .Where(y => y.UserID.Equals(x.Id) && y.Date >= NextGame.PREVIOUS_LAST_GAME.AddDays(-7))
                    .Select(y => y.FP).Sum(),
                Ranking = 0
            })
            .Where(x => x.Score > 0)
            .OrderByDescending(x => x.Score)
            .ToList();

            int position = 0;
            int rank = 1;
            ranking.ForEach(x =>
            {
                if (x.Id.Equals(id))
                {
                    position = rank;
                }
                rank++;
            });
            return position;
        }

    }
}
