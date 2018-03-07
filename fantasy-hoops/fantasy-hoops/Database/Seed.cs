using fantasy_hoops.Models;
using System;
using System.Linq;
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
                                    Price = 60000,
                                    PPG = 10.0,
                                    TeamID = team.TeamID,
                                    Team = team
                                };
                                context.Players.Add(player);
                                team.Players.Add(player);
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

        public static void UpdateTeamColors(GameContext context)
        {
            // Hardcoding like a champ
            string[] colors = { /* Raptors */ "#CD1141", /* Celtics */ "#008248",
                /* 76ers */ "#006BB6", /* Knicks */ "#006BB6", /* Nets */ "#000000",
                /* Cavaliers */ "#6F2633", /* Pacers */ "#002D62", /* Bucks */ "#00471B",
                /* Pistons */ "#E01E38", /* Bulls */ "#CE1141", /* Wizards */ "#002B5C",
                /* Heat */ "#98002E", /* Hornets */ "#1D1160", /* Magic */ "#0B77BD",
                /* Hawks */ "#E03A3E", /* Trail Blazers */ "#E13A3E", /* Timberwolves */ "#002B5C",
                /* Thunder */ "#007AC1", /* Nuggets */ "#00285E", /* Jazz */ "#0C2340",
                /* Warriors */ "#243E90", /* Clippers */ "#ED174C", /* Lakers */ "#552583",
                /* Kings */ "#5A2D81", /* Suns */ "#E56020", /* Rockets */ "#CE1141",
                /* Pelicans */ "#0C2340", /* Spurs */ "#C4CED4", /* Mavericks */ "#007DC5",
                /* Grizzlies */ "#00285E"};

            int i = 0;
            foreach (var team in context.Teams)
            {
                if(i < colors.Count())
                    team.Color = colors[i];
                i++;
            }
            context.SaveChanges();
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
