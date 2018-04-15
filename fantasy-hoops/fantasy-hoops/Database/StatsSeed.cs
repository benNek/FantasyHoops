using System.Net;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System;
using Newtonsoft.Json.Linq;
using fantasy_hoops.Models;
using System.Globalization;
using FluentScheduler;
using fantasy_hoops.Helpers;

namespace fantasy_hoops.Database
{
    public class StatsSeed
    {

        public static async Task Initialize(GameContext context)
        {
            // Gets each day's stats the number of days before today
            int daysFromToday = 30;
            await Calculate(context, daysFromToday);
            JobManager.AddJob(() => Task.Run(() => Initialize(context)), s => s.WithName("statsSeed")
                .ToRunOnceAt(NextGame.LAST_NEXT_GAME.AddHours(NextGame.HOUR_DIFF).AddHours(5)));
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

        private static JObject GetBoxscore(string url)
        {
            HttpWebResponse webResponse = CommonFunctions.GetResponse(url);
            string apiResponse = CommonFunctions.ResponseToString(webResponse);
            JObject json = JObject.Parse(apiResponse);
            return json;
        }

        private static async Task Calculate(GameContext context, int days)
        {
            while (days > 0)
            {
                string gameDate = DateTime.Today.AddDays(-days).ToString("yyyyMMdd");
                JArray games = GetGames(gameDate);
                DateTime date = DateTime.ParseExact(gameDate, "yyyyMMdd", CultureInfo.InvariantCulture);

                foreach (JObject game in games)
                {
                    string bsUrl = "http://data.nba.net/10s/prod/v1/" + gameDate + "/" + game["gameId"] + "_boxscore.json";
                    JObject boxscore = GetBoxscore(bsUrl);
                    if (boxscore["stats"] == null)
                        continue;
                    int hTeam = (int)boxscore["basicGameData"]["hTeam"]["teamId"];
                    int vTeam = (int)boxscore["basicGameData"]["vTeam"]["teamId"];
                    var stats = boxscore["stats"]["activePlayers"];
                    JArray players = (JArray)stats;
                    foreach (var player in players)
                    {
                        int oppId;
                        string score = "";
                        if (!context.Players.Any(x => x.NbaID.Equals((int)player["personId"])))
                            continue;
                        if ((int)player["teamId"] == hTeam)
                        {
                            oppId = vTeam;
                            score = (int)boxscore["basicGameData"]["hTeam"]["score"] + "-" + (int)boxscore["basicGameData"]["vTeam"]["score"];
                        }
                        else
                        {
                            oppId = hTeam;
                            score = (int)boxscore["basicGameData"]["vTeam"]["score"] + "-" + (int)boxscore["basicGameData"]["hTeam"]["score"];
                        }
                        AddToDatabase(context, player, date, oppId, score);
                    }
                    await context.SaveChangesAsync();
                }
                days--;
            }
        }

        private static void AddToDatabase(GameContext context, JToken player, DateTime date, int oppId, string score)
        {
            var statsObj = new Stats
            {
                Date = date,
                OppID = oppId,
                Score = score,
                MIN = (string)player["min"],
                FGM = (int)player["fgm"],
                FGA = (int)player["fga"],
                FGP = (double)player["fgp"],
                TPM = (int)player["tpm"],
                TPA = (int)player["tpa"],
                TPP = (double)player["tpp"],
                FTM = (int)player["ftm"],
                FTA = (int)player["fta"],
                FTP = (double)player["ftp"],
                DREB = (int)player["defReb"],
                OREB = (int)player["offReb"],
                TREB = (int)player["totReb"],
                AST = (int)player["assists"],
                BLK = (int)player["blocks"],
                STL = (int)player["steals"],
                FLS = (int)player["pFouls"],
                TOV = (int)player["turnovers"],
                PTS = (int)player["points"],
                PlayerID = (int)player["personId"]
            };
            statsObj.Player = context.Players.Where(x => x.NbaID == statsObj.PlayerID).FirstOrDefault();
            bool shouldAdd = !context.Stats.Any(x => x.Date == date && x.Player.NbaID == statsObj.PlayerID);
            int count = context.Stats.Where(x => x.Player.NbaID == statsObj.PlayerID).Count();
            if (shouldAdd)
            {
                statsObj.GS = Math.Round(statsObj.PTS + 0.4 * statsObj.FGM + 0.7 * statsObj.OREB
                    + 0.3 * statsObj.DREB + statsObj.STL + 0.7 * statsObj.AST + 0.7 * statsObj.BLK
                    - 0.7 * statsObj.FGA - 0.4 * statsObj.FTM - 0.4 * statsObj.FLS - statsObj.TOV, 2);

                statsObj.FP = Math.Round(statsObj.PTS + 1.2 * (statsObj.DREB + statsObj.OREB)
                    + 1.5 * statsObj.AST + 3 * statsObj.STL + 3 * statsObj.BLK - statsObj.TOV, 2);

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