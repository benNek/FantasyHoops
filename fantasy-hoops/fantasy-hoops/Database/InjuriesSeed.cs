using System.Net;
using System.Linq;
using System.Threading.Tasks;
using System;
using Newtonsoft.Json.Linq;
using fantasy_hoops.Models;
using Microsoft.EntityFrameworkCore;
using fantasy_hoops.Helpers;

namespace fantasy_hoops.Database
{
    public class InjuriesSeed
    {
        const int DAYS_TO_SAVE = 1;
        static DateTime dayFrom = NextGame.NEXT_GAME.AddDays(-DAYS_TO_SAVE - 1);

        public static async Task Initialize(GameContext context)
        {
            await Extract(context);
        }

        private static JArray GetInjuries()
        {
            HttpWebResponse webResponse = CommonFunctions.GetResponse("https://www.fantasylabs.com/api/players/news/2/");
            string myResponse = CommonFunctions.ResponseToString(webResponse);
            JArray injuries = JArray.Parse(myResponse);
            return injuries;
        }

        private static async Task Extract(GameContext context)
        {
            context.Database.ExecuteSqlCommand("DELETE FROM [fantasyhoops].[dbo].[Injuries]");
            JArray injuries = GetInjuries();
            foreach (JObject injury in injuries)
            {
                if (dayFrom.CompareTo(DateTime.Parse(injury["CreatedDate"].ToString()).ToUniversalTime()) > 0)
                    break;
                AddToDatabase(context, injury);
            }
            await context.SaveChangesAsync();
        }

        private static void AddToDatabase(GameContext context, JToken injury)
        {
            var injuryObj = new Injuries
            {
                Title = (string)injury["Title"],
                Status = (string)injury["PlayerStatus"],
                Injury = (string)injury["Injury"],
                Description = (string)injury["News"],
                Date = DateTime.Parse(injury["CreatedDate"].ToString()).ToUniversalTime(),
                Link = (string)injury["Link"]
            };
            injuryObj.Player = context.Players.Where(x => x.NbaID == (int)injury["PrimarySourceKey"]).FirstOrDefault();

            if (injuryObj.Player == null)
                return;
            context.Injuries.Add(injuryObj);
        }
    }
}