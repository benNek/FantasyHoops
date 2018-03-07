﻿using System.Net;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System;
using Newtonsoft.Json.Linq;
using fantasy_hoops.Models;
using System.Globalization;

namespace fantasy_hoops.Database
{
    public class StatsSeed
    {

        public static async Task Initialize(GameContext context)
        {
            // Gets each day's stats the number of days before today
            int daysFromToday = 30;
            await Calculate(context, daysFromToday);
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

        private static JArray GetGames(string date)
        {
            string url = "http://data.nba.net/10s/prod/v2/" + date + "/scoreboard.json";
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

        private static async Task Calculate(GameContext context, int days)
        {
            while (days > 0)
            {
                string gameDate = DateTime.Today.AddDays(-days).ToShortDateString().Replace("-", string.Empty);
                JArray games = GetGames(gameDate);
                DateTime date = DateTime.ParseExact(gameDate, "yyyyMMdd", CultureInfo.InvariantCulture);

                foreach (JObject game in games)
                {
                    string bsUrl = "http://data.nba.net/10s/prod/v1/" + gameDate + "/" + game["gameId"] + "_boxscore.json";
                    JObject boxscore = GetBoxscore(bsUrl);
                    if (boxscore["stats"] == null)
                        continue;
                    var stats = boxscore["stats"]["activePlayers"];
                    JArray players = (JArray)stats;
                    foreach (var player in players)
                    {
                        if (!context.Players.Any(x => x.NbaID.Equals((int)player["personId"])))
                            continue;
                        AddToDatabase(context, player, date);
                    }
                    await context.SaveChangesAsync();
                }
                days--;
            }
        }

        private static void AddToDatabase(GameContext context, JToken player, DateTime date)
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
            bool shouldAdd = !context.Stats.Any(x => x.Date == date && x.Player.NbaID == statsObj.PlayerID);
            int count = context.Stats.Where(x => x.Player.NbaID == statsObj.PlayerID).Count();
            if (shouldAdd)
            {
                if (count < 5)
                {
                    context.Stats.Add(statsObj);
                    return;
                }
                else
                {
                    var rmObj = context.Stats
                        .Where(x => x.Player.NbaID == statsObj.PlayerID)
                        .OrderBy(x => x.Date)
                        .First();
                    if (rmObj != null)
                    {
                        context.Stats.Remove(rmObj);
                        context.Stats.Add(statsObj);
                    }
                    return;
                }
            }
            else return;
        }
    }
}