using System.Net;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System;
using Newtonsoft.Json.Linq;
using fantasy_hoops.Models;
using System.Globalization;
using fantasy_hoops.Helpers;
using FluentScheduler;
using fantasy_hoops.Services;

namespace fantasy_hoops.Database
{
    public class StatsSeed
    {

        private static ScoreService _scoreService;

        public static void Initialize(GameContext context)
        {
            _scoreService = new ScoreService();
            // Gets each day's stats the number of days before today
            int daysFromToday = 5;
            Calculate(context, daysFromToday);

            JobManager.AddJob(() => UserScoreSeed.Initialize(context),
                s => s.WithName("userScore")
                .ToRunNow());
        }

        private static JObject GetBoxscore(string url)
        {
            HttpWebResponse webResponse = CommonFunctions.GetResponse(url);
            string apiResponse = CommonFunctions.ResponseToString(webResponse);
            JObject json = JObject.Parse(apiResponse);
            return json;
        }

        private static void Calculate(GameContext context, int days)
        {
            while (days > 0)
            {
                string gameDate = NextGame.NEXT_GAME.AddDays(-days).ToString("yyyyMMdd");
                JArray games = CommonFunctions.GetGames(gameDate);

                foreach (JObject game in games)
                {
                    string bsUrl = "http://data.nba.net/10s/prod/v1/" + gameDate + "/" + game["gameId"] + "_boxscore.json";
                    JObject boxscore = GetBoxscore(bsUrl);
                    if (boxscore["stats"] == null)
                        continue;
                    int hTeam = (int)boxscore["basicGameData"]["hTeam"]["teamId"];
                    int vTeam = (int)boxscore["basicGameData"]["vTeam"]["teamId"];
                    var stats = boxscore["stats"]["activePlayers"];
                    DateTime date = DateTime.Parse((string)boxscore["basicGameData"]["startTimeUTC"]);
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
                }
                days--;
            }
            context.SaveChanges();
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

            if (shouldAdd)
            {
                statsObj.GS = _scoreService.GetGameScore(statsObj.PTS, statsObj.FGM, statsObj.DREB, statsObj.OREB,
                    statsObj.STL, statsObj.AST, statsObj.BLK, statsObj.FGA, statsObj.FTA - statsObj.FTM,
                    statsObj.FLS, statsObj.TOV);

                statsObj.FP = _scoreService.GetFantasyPoints(statsObj.PTS, statsObj.DREB, statsObj.OREB,
                    statsObj.AST, statsObj.STL, statsObj.BLK, statsObj.TOV);

                statsObj.Price = _scoreService.GetPrice(statsObj.FP, statsObj.GS);
                context.Stats.Add(statsObj);
            }
        }
    }
}