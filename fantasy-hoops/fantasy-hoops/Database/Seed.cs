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
                                    Price = PlayerSeed.PRICE_FLOOR,
                                    FPPG = 0.0,
                                    PTS = 0.0,
                                    REB = 0.0,
                                    AST = 0.0,
                                    STL = 0.0,
                                    BLK = 0.0,
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
            foreach (var team in context.Teams)
            {
                team.Color = GetTeamColor(team.NbaID);
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

        private static string GetTeamColor(int id)
        {
            switch (id)
            {
                // RAPTORS
                case 1610612761:
                    return "#CD1141";
                // CELTICS
                case 1610612738:
                    return "#008248";
                // 76ERS
                case 1610612755:
                    return "#006BB6";
                // KNICKS
                case 1610612752:
                    return "#006BB6";
                // NETS
                case 1610612751:
                    return "#000000";
                // CAVALIERS
                case 1610612739:
                    return "#6F2633";
                // PACERS
                case 1610612754:
                    return "#002D62";
                // BUCKS
                case 1610612749:
                    return "#00471B";
                // PISTONS
                case 1610612765:
                    return "#E01E38";
                // BULLS
                case 1610612741:
                    return "#CE1141";
                // WIZARDS
                case 1610612764:
                    return "#002B5C";
                // HEAT
                case 1610612748:
                    return "#98002E";
                // HORNETS
                case 1610612766:
                    return "#1D1160";
                // MAGIC
                case 1610612753:
                    return "#0B77BD";
                // HAWKS
                case 1610612737:
                    return "#E03A3E";
                // TRAIL BLAZERS
                case 1610612757:
                    return "#E13A3E";
                // TIMBERWOLVES
                case 1610612750:
                    return "#002B5C";
                // THUNDER
                case 1610612760:
                    return "#007AC1";
                // NUGGETS
                case 1610612743:
                    return "#00285E";
                // JAZZ
                case 1610612762:
                    return "#0C2340";
                // WARRIORS
                case 1610612744:
                    return "#243E90";
                // CLIPPERS
                case 1610612746:
                    return "#ED174C";
                // LAKERS
                case 1610612747:
                    return "#552583";
                // KINGS
                case 1610612758:
                    return "#5A2D81";
                // SUNS
                case 1610612756:
                    return "#E56020";
                // ROCKETS
                case 1610612745:
                    return "#CE1141";
                // PELICANS
                case 1610612740:
                    return "#0C2340";
                // SPURS
                case 1610612759:
                    return "#C4CED4";
                // MAVERICKS
                case 1610612742:
                    return "#007DC5";
                // GRIZZLIES
                case 1610612763:
                    return "#00285E";
                default:
                    return "#C4CED4";
            }
        }

    }
}
