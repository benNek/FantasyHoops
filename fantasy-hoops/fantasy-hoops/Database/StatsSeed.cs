using System.Net;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Diagnostics;
using Newtonsoft.Json.Linq;

namespace fantasy_hoops.Database
{
    public class StatsSeed
    {
        readonly static string today = DateTime.Today.AddDays(-1).ToShortDateString().Replace("-", string.Empty);

        public static void Initialize(GameContext context)
        {
            string url = "http://data.nba.net/10s/prod/v2/" + today + "/scoreboard.json";
            JArray games = GetGames(url);
            Calculate(games);
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

        private static JArray GetGames(string url)
        {
            HttpWebResponse webResponse = GetResponse(url);
            string apiResponse = ResponseToString(webResponse);
            JObject json = JObject.Parse(apiResponse);
            JArray games = (JArray)json["games"];
            return games;
        }

        private static JObject GetBoxscore(string url)
        {
            HttpWebResponse webResponse = GetResponse(url);
            string apiResponse = ResponseToString(webResponse);
            JObject json = JObject.Parse(apiResponse);
            return json;
        }

        private static void Calculate(JArray games)
        {
            foreach (JObject game in games)
            {
                Debug.WriteLine(game["gameId"]);
                string boxscore = "http://data.nba.net/10s/prod/v1/" + today + "/" + game["gameId"] + "_boxscore.json";
                JObject bs = GetBoxscore(boxscore);
                var stats = bs["stats"]["activePlayers"];
                Debug.WriteLine(stats);
            }
        }
    }
}