using fantasy_hoops.Database;
using FluentScheduler;
using System;
using System.Threading.Tasks;

namespace fantasy_hoops
{
    public class Scheduler
    {
        public static async void Run(GameContext _context)
        {
            await Task.Run(() => Seed.UpdateTeamColors(_context));
            var registry = new Registry();
            JobManager.Initialize(registry);
            JobManager.UseUtcTime();

            JobManager.AddJob(() => NextGame.Initialize(_context),
                s => s.WithName("nextGame")
                .ToRunOnceAt(DateTime.UtcNow.AddSeconds(5)));

            JobManager.AddJob(() => NextGame.SetClientTime(),
                s => s.WithName("setTime")
                .ToRunOnceAt(DateTime.UtcNow.AddSeconds(8)));

            JobManager.AddJob(() => InjuriesSeed.Initialize(_context),
                s => s.WithName("injuries")
                .ToRunOnceAt(DateTime.UtcNow.AddSeconds(10))
                .AndEvery(30)
                .Minutes());

            JobManager.AddJob(() => PhotosSeed.Initialize(_context),
                s => s.WithName("photos")
                .ToRunOnceAt(DateTime.UtcNow.AddMinutes(5))
                .AndEvery(1)
                .Days()
                .At(00, 00));   // 20p.m. Eastern Time
        }
    }
}
