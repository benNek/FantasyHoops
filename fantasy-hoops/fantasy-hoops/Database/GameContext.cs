using fantasy_hoops.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
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

    }
}
