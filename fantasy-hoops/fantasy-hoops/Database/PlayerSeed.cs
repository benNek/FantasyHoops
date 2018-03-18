using System.Net;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System;
using Newtonsoft.Json.Linq;
using fantasy_hoops.Models;
using System.Globalization;
using System.Diagnostics;

namespace fantasy_hoops.Database
{
    public class PlayerSeed
    {

        public static async Task Initialize(GameContext context)
        {
            await Calculate(context);
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

        private static JObject GetPlayer(int id)
        {
            string url = "http://data.nba.net/10s/prod/v1/2017/players/" + id + "_profile.json";
            HttpWebResponse webResponse = GetResponse(url);
            string apiResponse = ResponseToString(webResponse);
            JObject json = JObject.Parse(apiResponse);
            return json;
        }

        private static async Task Calculate(GameContext context)
        {
            foreach (var player in context.Players)
            {
                try
                {
                    JToken stats = GetPlayer(player.NbaID)["league"]["standard"]["stats"]["latest"];
                    player.PTS = (double)stats["ppg"];
                    player.REB = (double)stats["rpg"];
                    player.AST = (double)stats["apg"];
                    player.STL = (double)stats["spg"];
                    player.BLK = (double)stats["bpg"];
                    player.TOV = (double)stats["topg"];
                    player.GP = (int)stats["gamesPlayed"];
                    player.FPPG = FPPG(player);
                }
                catch (Exception e)
                {
                    Debug.WriteLine(e.Message);
                    continue;
                }
            }
            await context.SaveChangesAsync();
        }

        private static double FPPG(Player p)
        {
            return Math.Round((1 * p.PTS) + (1.2 * p.REB) + (1.5 * p.AST) + (3 * p.STL) + (3 * p.BLK) - (1 * p.TOV), 2);
        }
    }
}