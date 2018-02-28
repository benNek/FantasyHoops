using fantasy_hoops.Database;
using fantasy_hoops.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Runtime.Serialization.Json;
using System.Runtime.Serialization;
using Newtonsoft.Json.Linq;
using System.Net;
using fantasy_hoops.Enums;

namespace fantasy_hoops.Migrations
{
    public class Seed
    {

        public static async Task InitializeAsync(GameContext context)
        {
            context.Database.EnsureCreated();
          /*  if (context.Teams.Any())
            {
                return;
            }*/
            
            HttpClient client = new HttpClient();

            string apiResponse =
                GetResponse("http://api.sportradar.us/nba/trial/v4/en/seasons/2017/REG/rankings.json?api_key=cm2ujj5ekzrt2r7wae5badha");
            System.Threading.Thread.Sleep(1000);
            string playerResponse = "";

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
                        context.Teams.Add(team);

                        var key = teams[k].SelectToken("id");

                        string url = @"http://api.sportradar.us/nba/trial/v4/en/teams/" +
                            key + "/profile.json?api_key=cm2ujj5ekzrt2r7wae5badha";

                        playerResponse = GetResponse(url);
                        JObject jobject = JObject.Parse(playerResponse);
                        JArray players = (JArray)jobject["players"];

                        for (int l = 0; l < players.Count(); l++)
                        {
                            try
                            {
                                players[l].SelectToken("reference");

                                var player = new Player
                                {
                                    FirstName = (string)players[l].SelectToken("first_name"),
                                    LastName = (string)players[l].SelectToken("last_name"),
                                    Position = (Position)Enum.Parse(typeof(Position), (string)players[l].SelectToken("primary_position")),
                                    NbaID = (int)players[l].SelectToken("reference")
                                };
                                context.Players.Add(player);
                            }
                            catch (ArgumentNullException)
                            {

                                continue;
                            }
                        }

                        System.Threading.Thread.Sleep(1000);
                    }
                }
            }


            context.SaveChanges();
        }

        private static string GetResponse(string url)
        {
            HttpClient client = new HttpClient();

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
