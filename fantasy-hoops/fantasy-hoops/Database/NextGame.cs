using FluentScheduler;
using Newtonsoft.Json.Linq;
using System;
using System.Globalization;
using System.Net;
using System.Threading.Tasks;
using fantasy_hoops.Helpers;

namespace fantasy_hoops.Database
{
    public class NextGame
    {
        public static DateTime NEXT_GAME = DateTime.UtcNow;
        public static DateTime NEXT_GAME_CLIENT = DateTime.UtcNow;
        public static DateTime NEXT_LAST_GAME = DateTime.UtcNow;
        public static DateTime LAST_GAME = DateTime.UtcNow;

        public static void SetClientTime()
        {
            NEXT_GAME_CLIENT = NEXT_GAME;
        }

        public static void SetLastGame()
        {
            LAST_GAME = NEXT_GAME;
        }

        public async static void Initialize(GameContext context)
        {
            string gameDate = GetDate();
            Calculate(gameDate);
            await PlayerSeed.Initialize(context);

            JobManager.AddJob(() => Task.Run(() => Initialize(context)),
                s => s.WithName("nextGame")
                .ToRunOnceAt(NEXT_GAME));

            JobManager.AddJob(() => Task.Run(() => StatsSeed.Initialize(context)),
                s => s.WithName("statsSeed")
                .ToRunOnceAt(NEXT_LAST_GAME.AddHours(5)));

            JobManager.AddJob(() => Task.Run(() => NewsSeed.Initialize(context)),
                s => s.WithName("news")
                .ToRunOnceAt(NEXT_LAST_GAME.AddHours(6)));
        }

        private static string GetDate()
        {
            string url = "http://data.nba.net/10s/prod/v1/today.json";
            HttpWebResponse webResponse = CommonFunctions.GetResponse(url);
            if (webResponse == null)
                return null;
            string apiResponse = CommonFunctions.ResponseToString(webResponse);
            JObject json = JObject.Parse(apiResponse);
            return (string)json["links"]["currentDate"];
        }

        private static void Calculate(string gameDate)
        {
            JArray games = CommonFunctions.GetGames(gameDate);
            if (games.Count > 0)
            {
                DateTime timeUTC = DateTime.Parse((string)games[0]["startTimeUTC"]);
                if (timeUTC > DateTime.UtcNow)
                {
                    LAST_GAME = NEXT_GAME;
                    NEXT_GAME = timeUTC;
                    NEXT_LAST_GAME = DateTime.Parse((string)games[games.Count - 1]["startTimeUTC"]);
                }
                else
                {
                    gameDate = DateTime.ParseExact(gameDate, "yyyyMMdd", CultureInfo.InvariantCulture)
                        .AddDays(1).ToString("yyyyMMdd");
                    Calculate(gameDate);
                }
            }
            else
            {
                gameDate = DateTime.ParseExact(gameDate, "yyyyMMdd", CultureInfo.InvariantCulture)
                    .AddDays(1).ToString("yyyyMMdd");
                Calculate(gameDate);
            }
        }
    }
}
