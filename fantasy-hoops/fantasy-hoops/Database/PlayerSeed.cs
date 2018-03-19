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
        public static int PRICE_FLOOR = 10;

        public static async Task Initialize(GameContext context)
        {
            await Calculate(context);
        }

        private static HttpWebResponse GetResponse(string url)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "GET";
                request.KeepAlive = true;
                request.ContentType = "application/json";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                return response;
            }
            catch
            {
                return null;
            }
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
            if (webResponse == null)
                return null;
            string apiResponse = ResponseToString(webResponse);
            JObject json = JObject.Parse(apiResponse);
            return json;
        }

        private static async Task Calculate(GameContext context)
        {
            foreach (var player in context.Players)
            {
                JObject p = GetPlayer(player.NbaID);
                if (p == null)
                {
                    player.Price = PRICE_FLOOR;
                    continue;
                }

                JToken stats = p["league"]["standard"]["stats"]["latest"];
                int gamesPlayed = (int)stats["gamesPlayed"];
                player.PTS = gamesPlayed <= 0 ? 0 : (double)stats["ppg"];
                player.REB = gamesPlayed <= 0 ? 0 : (double)stats["rpg"];
                player.AST = gamesPlayed <= 0 ? 0 : (double)stats["apg"];
                player.STL = gamesPlayed <= 0 ? 0 : (double)stats["spg"];
                player.BLK = gamesPlayed <= 0 ? 0 : (double)stats["bpg"];
                player.TOV = gamesPlayed <= 0 ? 0 : (double)stats["topg"];
                player.GP = gamesPlayed <= 0 ? 0 : gamesPlayed;
                player.FPPG = gamesPlayed <= 0 ? 0 : FPPG(player);
                player.Price = gamesPlayed <= 0 ? PRICE_FLOOR : Price(context, player);
            }
            await context.SaveChangesAsync();
        }

        private static double FPPG(Player p)
        {
            return Math.Round((1 * p.PTS) + (1.2 * p.REB) + (1.5 * p.AST) + (3 * p.STL) + (3 * p.BLK) - (1 * p.TOV), 2);
        }

        private static int Price(GameContext context, Player p)
        {
            double GSavg = 0;
            if (context.Stats.Where(x => x.Player.NbaID == p.NbaID).Count() < 1)
                return PRICE_FLOOR;

            try
            {
                GSavg = context.Stats
                            .Where(x => x.Player.NbaID == p.NbaID)
                            .Select(s => s.GS)
                            .Average();
            }
            catch { }
            int price = (int)(GSavg + p.FPPG) * 7 / 5;
            if (price < PRICE_FLOOR)
                return PRICE_FLOOR;
            return price;
        }
    }
}