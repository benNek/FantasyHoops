using FluentScheduler;
using Newtonsoft.Json.Linq;
using System;
using System.Globalization;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using fantasy_hoops.Helpers;

namespace fantasy_hoops.Database
{
    public class NextGame
    {
        public static DateTime NEXT_GAME = DateTime.UtcNow;
        public static DateTime LAST_NEXT_GAME = DateTime.UtcNow;

        public static void Initialize()
        {
            string gameDate = GetDate();
            Calculate(gameDate);
            JobManager.AddJob(() => Task.Run(() => Initialize()), s => s.WithName("nextGame")
                .ToRunOnceAt(NEXT_GAME));
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
                    NEXT_GAME = timeUTC;
                    LAST_NEXT_GAME = DateTime.Parse((string)games[games.Count - 1]["startTimeUTC"]);
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
