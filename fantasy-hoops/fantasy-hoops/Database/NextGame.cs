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
        public const int HOUR_DIFF = 7;
        public static DateTime NEXT_GAME = DateTime.Now;
        public static DateTime LAST_NEXT_GAME = DateTime.Now;

        public static void Initialize()
        {
            string gameDate = GetDate();
            Calculate(gameDate);
            JobManager.AddJob(() => Task.Run(() => Initialize()), s => s.WithName("nextGame")
                .ToRunOnceAt(NEXT_GAME.AddHours(HOUR_DIFF).AddMinutes(1)));
      }

        private static string GetDate()
        {
            string url = "http://data.nba.net/10s/prod/v1/today.json";
            HttpWebResponse webResponse = CommonFunctions.GetResponse(url);
            if (webResponse == null)
                return null;
            string apiResponse = CommonFunctions.ResponseToString(webResponse);
            JObject json = JObject.Parse(apiResponse);
            string date = (string)json["links"]["currentDate"];

            int toAdd = DateTime.Now.Hour >= 19 ? 1 : 0;
            toAdd = DateTime.Now.Hour < 7 ? 0 : toAdd;
            date = DateTime.ParseExact(date, "yyyyMMdd", CultureInfo.InvariantCulture)
                .AddDays(toAdd).ToString("yyyyMMdd");
            return date;
        }

        private static JArray GetGames(string date)
        {
            string url = "http://data.nba.net/10s/prod/v2/" + date + "/scoreboard.json";
            HttpWebResponse webResponse = CommonFunctions.GetResponse(url);
            string apiResponse = CommonFunctions.ResponseToString(webResponse);
            JObject json = JObject.Parse(apiResponse);
            JArray games = (JArray)json["games"];
            return games;
        }

        private static void Calculate(string gameDate)
        {
            DateTime timeUTC;
            TimeZoneInfo eastern = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
            JArray games = GetGames(gameDate);
            if (games.Count > 0)
            {
                timeUTC = DateTime.Parse((string)games[0]["startTimeUTC"]);
                NEXT_GAME = TimeZoneInfo.ConvertTimeFromUtc(timeUTC, eastern);

                timeUTC = DateTime.Parse((string)games[games.Count - 1]["startTimeUTC"]);
                LAST_NEXT_GAME = TimeZoneInfo.ConvertTimeFromUtc(timeUTC, eastern);
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
