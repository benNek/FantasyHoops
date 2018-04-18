using System.Net;
using System.Linq;
using System.Threading.Tasks;
using System;
using Newtonsoft.Json.Linq;
using fantasy_hoops.Models;
using FluentScheduler;
using fantasy_hoops.Helpers;

namespace fantasy_hoops.Database
{
    public class PlayerSeed
    {
        public static int PRICE_FLOOR = 10;

        public static async Task Initialize(GameContext context)
        {
            await Calculate(context);
            NextGame.NEXT_GAME_CLIENT = NextGame.NEXT_GAME;
            JobManager.AddJob(() => Task.Run(() => Initialize(context)), s => s.WithName("playerSeed")
                .ToRunOnceAt(NextGame.NEXT_GAME.AddSeconds(10)));
        }

        private static JObject GetPlayer(int id)
        {
            string url = "http://data.nba.net/10s/prod/v1/2017/players/" + id + "_profile.json";
            HttpWebResponse webResponse = CommonFunctions.GetResponse(url);
            if (webResponse == null)
                return null;
            string apiResponse = CommonFunctions.ResponseToString(webResponse);
            JObject json = JObject.Parse(apiResponse);
            return json;
        }

        private static async Task Calculate(GameContext context)
        {
            string date = GetDate();
            JArray games = CommonFunctions.GetGames(date);
            foreach (var player in context.Players)
            {
                JObject p = GetPlayer(player.NbaID);
                if (p == null)
                {
                    player.Price = PRICE_FLOOR;
                    continue;
                }

                JToken stats = p["league"]["standard"]["stats"]["latest"];
                int gamesPlayed = (int)stats["gamesPlayed"];
                player.PTS = gamesPlayed <= 0 ? 0 : (double)stats["ppg"];
                player.REB = gamesPlayed <= 0 ? 0 : (double)stats["rpg"];
                player.AST = gamesPlayed <= 0 ? 0 : (double)stats["apg"];
                player.STL = gamesPlayed <= 0 ? 0 : (double)stats["spg"];
                player.BLK = gamesPlayed <= 0 ? 0 : (double)stats["bpg"];
                player.TOV = gamesPlayed <= 0 ? 0 : (double)stats["topg"];
                player.GP = gamesPlayed <= 0 ? 0 : gamesPlayed;
                player.FPPG = gamesPlayed <= 0 ? 0 : FPPG(player);
                player.Price = gamesPlayed <= 0 ? PRICE_FLOOR : Price(context, player);
                player.IsPlaying = IsPlaying(player, games);
            }
            await context.SaveChangesAsync();
        }

        private static bool IsPlaying(Player player, JArray games)
        {
            foreach (JObject game in games)
            {
                int hTeam = (int)game["hTeam"]["teamId"];
                int vTeam = (int)game["vTeam"]["teamId"];
                if (player.Team.NbaID == hTeam || player.Team.NbaID == vTeam)
                    return true;
            }
            return false;
        }

        private static string GetDate()
        {
            return CommonFunctions.UTCToEastern(NextGame.NEXT_GAME).ToString("yyyyMMdd");
        }

        private static double FPPG(Player p)
        {
            return Math.Round((1 * p.PTS) + (1.2 * p.REB) + (1.5 * p.AST) + (3 * p.STL) + (3 * p.BLK) - (1 * p.TOV), 2);
        }

        private static int Price(GameContext context, Player p)
        {
            double GSavg = 0;
            if (context.Stats.Where(x => x.Player.NbaID == p.NbaID).Count() < 1)
                return PRICE_FLOOR;

            try
            {
                GSavg = context.Stats
                            .Where(x => x.Player.NbaID == p.NbaID)
                            .Select(s => s.GS)
                            .Average();
            }
            catch { }
            int price = (int)(GSavg + p.FPPG) * 7 / 5;
            if (price < PRICE_FLOOR)
                return PRICE_FLOOR;
            return price;
        }
    }
}