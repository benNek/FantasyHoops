using System.Net;
using System.Linq;
using System.Threading.Tasks;
using System;
using Newtonsoft.Json.Linq;
using fantasy_hoops.Models;
using System.Globalization;
using fantasy_hoops.Helpers;

namespace fantasy_hoops.Database
{
    public class NewsSeed
    {
        public static void Initialize(GameContext context)
        {
            Extract(context);
        }

        private static void Extract(GameContext context)
        {
            string today = GetDate();
            string yesterday = DateTime.ParseExact(today, "yyyyMMdd", CultureInfo.InvariantCulture)
                .AddDays(-1).ToString("yyyyMMdd");
            JArray tGames = CommonFunctions.GetGames(today);
            JArray yGames = CommonFunctions.GetGames(yesterday);
            JArray news = new JArray();
            GetPreviews(ref news, tGames, today);
            GetRecaps(ref news, yGames, yesterday);

            foreach (JObject newsObj in news)
            {
                AddToDatabase(context, newsObj);
            }

            context.SaveChanges();
        }
        public static JArray GetRecaps(ref JArray news, JArray games, string date)
        {
            foreach (JObject game in games)
            {
                string recap = "http://data.nba.net/10s/prod/v1/" + date + "/" + game["gameId"] + "_recap_article.json";
                JObject recapJson = null;

                try
                {
                    HttpWebResponse recapResponse = CommonFunctions.GetResponse(recap);
                    string apiRecapResponse = CommonFunctions.ResponseToString(recapResponse);
                    recapJson = JObject.Parse(apiRecapResponse);
                }
                catch
                {
                    continue;
                }

                if (recapJson != null)
                {
                    recapJson.Add("hTeamID", game["hTeam"]["teamId"]);
                    recapJson.Add("vTeamID", game["vTeam"]["teamId"]);
                    news.Add(recapJson);
                }
            }
            return news;
        }

        public static JArray GetPreviews(ref JArray news, JArray games, string date)
        {
            foreach (JObject game in games)
            {
                string preview = "http://data.nba.net/10s/prod/v1/" + date + "/" + game["gameId"] + "_preview_article.json";

                JObject previewJson = null;

                try
                {
                    HttpWebResponse previewResponse = CommonFunctions.GetResponse(preview);
                    string apiPreviewResponse = CommonFunctions.ResponseToString(previewResponse);
                    previewJson = JObject.Parse(apiPreviewResponse);
                }

                catch
                {
                    continue;
                }

                if (previewJson != null)
                {
                    previewJson.Add("hTeamID", game["hTeam"]["teamId"]);
                    previewJson.Add("vTeamID", game["vTeam"]["teamId"]);
                    news.Add(previewJson);
                }
            }
            return news;
        }

        private static void AddToDatabase(GameContext context, JToken newsObj)
        {
            var nObj = new News
            {
                Date = DateTime.Parse(newsObj["pubDateUTC"].ToString()),
                Title = (string)newsObj["title"],
                hTeamID = (int)newsObj["hTeamID"],
                vTeamID = (int)newsObj["vTeamID"]
            };

            bool shouldAdd = !context.News.Any(x => x.Title.Equals((string)newsObj["title"])
            && x.Date.Equals(DateTime.Parse(newsObj["pubDateUTC"].ToString())));

            if (nObj == null || !shouldAdd)
                return;
            context.News.Add(nObj);

            JArray paragraphs = (JArray)newsObj["paragraphs"];
            foreach (var parObj in paragraphs)
            {
                var paragraph = new Paragraph
                {
                    NewsID = nObj.NewsID,
                    Content = (string)parObj["paragraph"]
                };
                context.Paragraphs.Add(paragraph);
            }
            context.SaveChanges();
        }
        private static string GetDate()
        {
            return NextGame.PREVIOUS_GAME.ToString("yyyyMMdd");
        }
    }
}