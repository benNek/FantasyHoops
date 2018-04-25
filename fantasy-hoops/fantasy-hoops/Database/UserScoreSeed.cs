using fantasy_hoops.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Database
{
    public class UserScoreSeed
    {
        public static async Task Initialize(GameContext context)
        {
            await Update(context);
        }

        private static async Task Update(GameContext context)
        {
            var allPlayers = context.Lineups.Where(x => x.Date == NextGame.PREVIOUS_GAME)
                .Include(x => x.Player).ThenInclude(x => x.Stats)
                .ToList();
            foreach (var player in allPlayers)
            {
                player.FP = player.Player.Stats.OrderByDescending(x => x.Date).Select(x => x.FP).FirstOrDefault();
                player.Calculated = true;
            }

            var allUsersID = context.Lineups
                .Where(x => x.Date == NextGame.PREVIOUS_GAME)
                .Select(x => x.UserID)
                .Distinct();
            foreach (var userID in allUsersID)
            {
                var userScore = Math.Round(allPlayers
                    .Where(x => x.Date == NextGame.PREVIOUS_GAME
                            && x.UserID.Equals(userID))
                    .Select(x => x.FP).Sum(), 1);

                var notificationObj = new GameScoreNotification
                {
                    UserID = userID,
                    ReadStatus = false,
                    DateCreated = DateTime.UtcNow,
                    Score = userScore
                };
                context.Notifications.Add(notificationObj);
            }
            await context.SaveChangesAsync();
        }
    }
}
