using fantasy_hoops.Database;
using fantasy_hoops.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Migrations
{
    public class Seed
    {

        public static void Initialize(GameContext context)
        {
            context.Database.EnsureCreated();

            if(!context.Teams.Any())
            {
                var team = new Team
                {
                    NbaID = 1610612738,
                    Name = "Celtics",
                    City = "Boston",
                    Abbreviation = "BOS",
                    Color = "#008853"
                };
                context.Teams.Add(team);

                var player = new Player
                {
                    NbaID = 202681,
                    Name = "Kyrie",
                    Surname = "Irving",
                    Team = team,
                    Points = 25.9
                };
                context.Players.Add(player);

                player = new Player
                {
                    NbaID = 202330,
                    Name = "Gordon",
                    Surname = "Hayward",
                    Team = team,
                    Points = 2.0
                };
                context.Players.Add(player);

                team = new Team
                {
                    NbaID = 1610612739,
                    Name = "Cavaliers",
                    City = "Cleveland",
                    Abbreviation = "CLE",
                    Color = "#6F2633"
                };
                context.Teams.Add(team);

                player = new Player
                {
                    NbaID = 2544,
                    Name = "Lebron",
                    Surname = "James",
                    Team = team,
                    Points = 26.6
                };
                context.Players.Add(player);

                player = new Player
                {
                    NbaID = 201567,
                    Name = "Kevin",
                    Surname = "Love",
                    Team = team,
                    Points = 17.9
                };
                context.Players.Add(player);

                context.SaveChanges();
            }
        }

    }
}
