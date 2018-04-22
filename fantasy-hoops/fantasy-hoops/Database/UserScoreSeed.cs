﻿using Microsoft.EntityFrameworkCore;
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
            await context.SaveChangesAsync();
        }
    }
}
