using System;
using fantasy_hoops.Models;
using fantasy_hoops.Models.Notifications;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace fantasy_hoops.Database
{
    public class GameContext : IdentityDbContext<User>
    {

        public DbSet<Player> Players { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Stats> Stats { get; set; }
        public DbSet<Injuries> Injuries { get; set; }
        public DbSet<Paragraph> Paragraphs { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Lineup> Lineups { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<GameScoreNotification> GameScoreNotifications { get; set; }
        public DbSet<InjuryNotification> InjuryNotifications { get; set; }
        public DbSet<FriendRequestNotification> FriendRequestNotifications { get; set; }

        private static string connectionString = "Server=localhost;Database=fantasyhoops;Trusted_Connection=Yes;";

        public GameContext() : base((new DbContextOptionsBuilder<GameContext>())
            .UseSqlServer(connectionString).Options)
        {
        }

        public GameContext(DbContextOptions<GameContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(connectionString);
        }

        internal IActionResult Select(Func<object, object> p)
        {
            throw new NotImplementedException();
        }
    }
}
