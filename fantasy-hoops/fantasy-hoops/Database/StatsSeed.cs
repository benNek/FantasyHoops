using System.Net;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Diagnostics;
using Newtonsoft.Json.Linq;
using fantasy_hoops.Models;
using System.Globalization;

namespace fantasy_hoops.Database
{
    public class StatsSeed
    {
        readonly static string today = DateTime.Today.AddDays(-2).ToShortDateString().Replace("-", string.Empty);

        public static async Task Initialize(GameContext context)
        {
            string url = "http://data.nba.net/10s/prod/v2/" + today + "/scoreboard.json";
            JArray games = GetGames(url);
            await Calculate(games, context);
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

        private static async Task Calculate(JArray games, GameContext context)
        {
            DateTime date = DateTime.ParseExact(today, "yyyyMMdd", CultureInfo.InvariantCulture);
            foreach (JObject game in games)
            {
                string boxscore = "http://data.nba.net/10s/prod/v1/" + today + "/" + game["gameId"] + "_boxscore.json";
                JObject bs = GetBoxscore(boxscore);
                var stats = bs["stats"]["activePlayers"];
                JArray players = (JArray)stats;
                foreach (var player in players)
                {
                    var statsObj = new Stats
                    {
                        Date = date,
                        PTS = (int)player["points"],
                        FGM = (int)player["fgm"],
                        OREB = (int)player["offReb"],
                        DREB = (int)player["defReb"],
                        STL = (int)player["steals"],
                        AST = (int)player["assists"],
                        BLK = (int)player["blocks"],
                        FGA = (int)player["fga"],
                        FTM = (int)player["ftm"],
                        FTA = (int)player["fta"],
                        FLS = (int)player["pFouls"],
                        TOV = (int)player["turnovers"],
                        PlayerID = (int)player["personId"]
                    };
                    statsObj.Player = context.Players.Where(x => x.NbaID == statsObj.PlayerID).FirstOrDefault();
                    context.Stats.Add(statsObj);
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}