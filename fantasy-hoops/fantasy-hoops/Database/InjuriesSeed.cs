﻿using System.Net;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System;
using Newtonsoft.Json.Linq;
using fantasy_hoops.Models;
using Microsoft.EntityFrameworkCore;

namespace fantasy_hoops.Database
{
    public class InjuriesSeed
    {
        const int DAYS_TO_SAVE = 1;
        static DateTime dayFrom = DateTime.Today.AddDays(-DAYS_TO_SAVE);

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

        private static JArray GetInjuries()
        {
            HttpWebResponse webResponse = GetResponse("https://www.fantasylabs.com/api/players/news/2/");
            string myResponse = ResponseToString(webResponse);
            JArray injuries = JArray.Parse(myResponse);
            return injuries;
        }

        private static async Task Extract(GameContext context)
        {
            context.Database.ExecuteSqlCommand("DELETE FROM [fantasyhoops].[dbo].[Injuries]");
            JArray injuries = GetInjuries();
            foreach (JObject injury in injuries)
            {
                if (dayFrom.CompareTo(DateTime.Parse(injury["CreatedDate"].ToString())) > 0)
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
                Date = DateTime.Parse(injury["CreatedDate"].ToString()),
                Link = (string)injury["Link"]
            };
            injuryObj.Player = context.Players.Where(x => x.NbaID == (int)injury["PrimarySourceKey"]).FirstOrDefault();

            if (injuryObj.Player == null)
                return;
            context.Injuries.Add(injuryObj);
        }
    }
}