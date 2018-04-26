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
        public static DateTime PREVIOUS_GAME = DateTime.UtcNow;
        public static DateTime PREVIOUS_LAST_GAME = DateTime.UtcNow;

        public static void SetClientTime()
        {
            NEXT_GAME_CLIENT = NEXT_GAME;
        }

        public async static Task Initialize(GameContext context)
        {
            string gameDate = GetDate();

            await Task.Run(() => SetLastGame(gameDate));
            await Task.Run(() => SetNextGame(gameDate));

            JobManager.AddJob(async () => await Initialize(context),
                s => s.WithName(NEXT_GAME.ToLongDateString())
                .ToRunOnceAt(NEXT_GAME));

            DateTime nextRun = NEXT_LAST_GAME;
            if (DateTime.UtcNow < PREVIOUS_LAST_GAME.AddHours(5))
                nextRun = PREVIOUS_LAST_GAME;

            JobManager.AddJob(async () => await StatsSeed.Initialize(context),
                s => s.WithName("statsSeed_"+nextRun.ToLongDateString())
                .ToRunOnceAt(nextRun.AddHours(5)));

            JobManager.AddJob(async () => await NewsSeed.Initialize(context),
                s => s.WithName("news_"+nextRun.ToLongDateString())
                .ToRunOnceAt(nextRun.AddHours(8)));

            JobManager.AddJob(async () => await PlayerSeed.Initialize(context),
                s => s.WithName("playerSeed_"+nextRun.ToLongDateString())
                .ToRunNow());
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

        private static void SetNextGame(string gameDate)
        {
            JArray games = CommonFunctions.GetGames(gameDate);
            if (games.Count > 0)
            {
                DateTime timeUTC = DateTime.Parse((string)games[0]["startTimeUTC"]);
                if (timeUTC > DateTime.UtcNow)
                {
                    NEXT_GAME = timeUTC;
                    NEXT_LAST_GAME = DateTime.Parse((string)games[games.Count - 1]["startTimeUTC"]);
                }
                else
                {
                    gameDate = DateTime.ParseExact(gameDate, "yyyyMMdd", CultureInfo.InvariantCulture)
                        .AddDays(1).ToString("yyyyMMdd");
                    SetNextGame(gameDate);
                }
            }
            else
            {
                gameDate = DateTime.ParseExact(gameDate, "yyyyMMdd", CultureInfo.InvariantCulture)
                    .AddDays(1).ToString("yyyyMMdd");
                SetNextGame(gameDate);
            }
        }

        private static void SetLastGame(string gameDate)
        {
            JArray games = CommonFunctions.GetGames(gameDate);
            if (games.Count > 0)
            {
                DateTime timeUTC = DateTime.Parse((string)games[0]["startTimeUTC"]);
                if (timeUTC < DateTime.UtcNow)
                {
                    PREVIOUS_GAME = timeUTC;
                    PREVIOUS_LAST_GAME = DateTime.Parse((string)games[games.Count - 1]["startTimeUTC"]);
                }
                else
                {
                    gameDate = DateTime.ParseExact(gameDate, "yyyyMMdd", CultureInfo.InvariantCulture)
                        .AddDays(-1).ToString("yyyyMMdd");
                    SetLastGame(gameDate);
                }
            }
            else
            {
                gameDate = DateTime.ParseExact(gameDate, "yyyyMMdd", CultureInfo.InvariantCulture)
                    .AddDays(-1).ToString("yyyyMMdd");
                SetLastGame(gameDate);
            }
        }
    }
}
