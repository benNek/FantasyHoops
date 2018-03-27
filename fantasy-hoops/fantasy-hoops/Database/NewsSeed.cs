using System.Net;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System;
using Newtonsoft.Json.Linq;
using fantasy_hoops.Models;
using System.Globalization;

namespace fantasy_hoops.Database
{
    public class NewsSeed
    {
        public static async Task Initialize(GameContext context)
        {
            await Extract(context);
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

        private static async Task Extract(GameContext context)
        {
            string today = GetDate();
            string yesterday = DateTime.ParseExact(today, "yyyyMMdd", CultureInfo.InvariantCulture)
                .AddDays(-1).ToString("yyyyMMdd");
            JArray tGames = GetGames(today);
            JArray yGames = GetGames(yesterday);
            JArray news = new JArray();
            GetPreviews(ref news, tGames, today);
            GetRecaps(ref news, yGames, yesterday);

            foreach (JObject newsObj in news)
            {
                AddToDatabase(context, newsObj);
            }

            await context.SaveChangesAsync();
        }
        public static JArray GetRecaps(ref JArray news, JArray games, string date)
        {
            foreach (JObject game in games)
            {
                string recap = "http://data.nba.net/10s/prod/v1/" + date + "/" + game["gameId"] + "_recap_article.json";
                JObject recapJson = null;

                try
                {
                    HttpWebResponse recapResponse = GetResponse(recap);
                    string apiRecapResponse = ResponseToString(recapResponse);
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
                    HttpWebResponse previewResponse = GetResponse(preview);
                    string apiPreviewResponse = ResponseToString(previewResponse);
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
            string url = "http://data.nba.net/10s/prod/v1/today.json";
            HttpWebResponse webResponse = GetResponse(url);
            if (webResponse == null)
                return null;
            string apiResponse = ResponseToString(webResponse);
            JObject json = JObject.Parse(apiResponse);
            string date = (string)json["links"]["currentDate"];

            int toAdd = DateTime.Now.Hour >= 19 ? 0 : 1;
            date = DateTime.ParseExact(date, "yyyyMMdd", CultureInfo.InvariantCulture)
                .AddDays(toAdd).ToString("yyyyMMdd");
            return date;
        }

        private static JArray GetGames(string date)
        {
            string url = "http://data.nba.net/10s/prod/v1/" + date + "/scoreboard.json";
            HttpWebResponse webResponse = GetResponse(url);
            if (webResponse == null)
                return null;
            string apiResponse = ResponseToString(webResponse);
            JObject json = JObject.Parse(apiResponse);
            return (JArray)json["games"];
        }
    }
}