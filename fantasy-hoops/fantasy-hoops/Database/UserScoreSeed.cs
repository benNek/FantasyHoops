using fantasy_hoops.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Database
{
    public class UserScoreSeed
    {
        public static void Initialize(GameContext context)
        {
            Update(context);
        }

        private static void Update(GameContext context)
        {
            var allPlayers = context.Lineups.Where(x => x.Date == NextGame.PREVIOUS_GAME)
                .Include(x => x.Player).ThenInclude(x => x.Stats)
                .ToList();
            foreach (var player in allPlayers)
            {
                player.FP = player.Player.Stats
                    .Where(s => s.Date >= NextGame.PREVIOUS_GAME && s.Date <= NextGame.PREVIOUS_LAST_GAME)
                    .Select(x => x.FP).FirstOrDefault();
                player.Calculated = true;
            }

            context.Lineups
                .Where(x => x.Date == NextGame.PREVIOUS_GAME)
                .Select(x => x.UserID)
                .Distinct()
                .ToList()
                .ForEach(userID =>
                {
                    var userScore = Math.Round(allPlayers
                        .Where(x => x.Date == NextGame.PREVIOUS_GAME
                                && x.UserID.Equals(userID))
                        .Select(x => x.FP).Sum(), 1);

                    var gs = new GameScoreNotification
                    {
                        UserID = userID,
                        ReadStatus = false,
                        DateCreated = DateTime.UtcNow,
                        Score = userScore
                    };
                    if (!context.GameScoreNotifications
                    .Any(x => x.UserID.Equals(userID)
                                && x.Score == userScore
                                && x.DateCreated < DateTime.UtcNow
                                && x.DateCreated > NextGame.PREVIOUS_LAST_GAME))
                        context.GameScoreNotifications.Add(gs);
                });
            context.SaveChanges();
        }
    }
}
