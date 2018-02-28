using fantasy_hoops.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Database
{
    public class GameContext : DbContext
    {

        public GameContext() : base((new DbContextOptionsBuilder<GameContext>()).UseSqlServer("Server=localhost;Database=fantasyhoops;Trusted_Connection=Yes;").Options)
        {
        }

        public GameContext(DbContextOptions<GameContext> options) : base(options)
        {

        }

        public DbSet<Player> Players { get; set; }
        public DbSet<Team> Teams { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json",
              optional: true, reloadOnChange: true);
            var config = builder.Build();
            optionsBuilder.UseSqlServer("Server=localhost;Database=fantasyhoops;Trusted_Connection=Yes;");
        }

    }
}
