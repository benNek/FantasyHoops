using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace fantasy_hoops.Database
{
    public class NextGame
    {
        public static DateTime NEXT_GAME = DateTime.Now;

        public static void Initialize()
        {
            string gameDate = GetDate();
            Calculate(gameDate);
        }

        private static HttpWebResponse GetResponse(string url)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            request.KeepAlive = true;
            request.ContentType = "application/json";
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            return response;
        }

        private static string ResponseToString(HttpWebResponse response)
        {
            string resp = "";
            using (StreamReader sr = new StreamReader(response.GetResponseStream()))
            {
                resp = sr.ReadToEnd();
            }
            return resp;
        }

        private static string GetDate()
        {
            string url = "http://data.nba.net/10s/prod/v1/today.json";
            HttpWebResponse webResponse = GetResponse(url);
            if (webResponse == null)
                return null;
            string apiResponse = ResponseToString(webResponse);
            JObject json = JObject.Parse(apiResponse);
            string date = (string)json["links"]["currentDate"];

            int toAdd = DateTime.Now.Hour >= 19 ? 0 : 1;
            toAdd = DateTime.Now.Hour < 7 ? -1 : toAdd;
            date = DateTime.ParseExact(date, "yyyyMMdd", CultureInfo.InvariantCulture)
                .AddDays(toAdd).ToString("yyyyMMdd");
            return date;
        }

        private static JArray GetGames(string date)
        {
            string url = "http://data.nba.net/10s/prod/v2/" + date + "/scoreboard.json";
            HttpWebResponse webResponse = GetResponse(url);
            string apiResponse = ResponseToString(webResponse);
            JObject json = JObject.Parse(apiResponse);
            JArray games = (JArray)json["games"];
            return games;
        }

        private static void Calculate(string gameDate)
        {
            JArray games = GetGames(gameDate);
            if (games.Count > 0)
            {
                DateTime timeUTC = DateTime.Parse((string)games[0]["startTimeUTC"]);
                TimeZoneInfo eastern = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
                NEXT_GAME = TimeZoneInfo.ConvertTimeFromUtc(timeUTC, eastern);
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
