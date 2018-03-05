using fantasy_hoops.Models;
using System;
using System.Linq;
using System.Net.Http;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Threading.Tasks;

namespace fantasy_hoops.Database
{
    public class Seed
    {

        public static async Task InitializeAsync(GameContext context)
        {
            // Checking if the tables are seeded already
            if (context.Teams.Any())
            {
                return;
            }

            HttpClient client = new HttpClient();

            string apiResponse =
                GetResponse("http://api.sportradar.us/nba/trial/v4/en/seasons/2017/REG/rankings.json?api_key=zerbknhxk7ubqyb55yxkx2q3");
            System.Threading.Thread.Sleep(1000);

            JObject json = JObject.Parse(apiResponse);
            JArray teams;
            for (int i = 0; i < json["conferences"].Count(); i++)
            {
                for (int j = 0; j < json["conferences"][i]["divisions"].Count(); j++)
                {
                    for (int k = 0; k <= json["conferences"][i]["divisions"][j].Count(); k++)
                    {
                        teams = (JArray)json["conferences"][i]["divisions"][j]["teams"];
                        var team = new Team
                        {
                            Name = (string)teams[k].SelectToken("name"),
                            City = (string)teams[k].SelectToken("market"),
                            NbaID = (int)teams[k].SelectToken("reference"),
                            Color = "#C4CED4"
                        };

                        var key = teams[k].SelectToken("id");
                        string url = @"http://api.sportradar.us/nba/trial/v4/en/teams/" +
                               key + "/profile.json?api_key=zerbknhxk7ubqyb55yxkx2q3";
                        string playerResponse = GetResponse(url);

                        JObject jobject = JObject.Parse(playerResponse);
                        JArray players = (JArray)jobject["players"];
                        for (int l = 0; l < players.Count(); l++)
                        {
                            try
                            {
                                players[l].SelectToken("reference");

                                var player = new Player
                                {
                                    FirstName = (String)players[l].SelectToken("first_name"),
                                    LastName = (String)players[l].SelectToken("last_name"),
                                    Position = (String)players[l].SelectToken("primary_position"),
                                    NbaID = (int)players[l].SelectToken("reference"),
                                    Number = (int)players[l].SelectToken("jersey_number"),
                                    Team = team
                                };
                                context.Players.Add(player);
                            }
                            catch (ArgumentNullException)
                            {
                                continue;
                            }
                        }
                        context.Teams.Add(team);
                        await context.SaveChangesAsync();
                        System.Threading.Thread.Sleep(1000);
                    }
                }
            }
        }

        private static string GetResponse(string url)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            request.KeepAlive = true;
            request.ContentType = "application/json";

            HttpWebResponse response = (HttpWebResponse)request.GetResponse();

            string resp = "";
            using (System.IO.StreamReader sr = new System.IO.StreamReader(response.GetResponseStream()))
            {
                resp = sr.ReadToEnd();
            }

            return resp;
        }

    }
}
