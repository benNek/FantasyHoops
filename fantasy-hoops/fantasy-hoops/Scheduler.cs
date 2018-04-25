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

            JobManager.AddJob(async () => await NextGame.Initialize(_context),
                s => s.WithName("nextGame")
                .ToRunOnceAt(DateTime.UtcNow.AddSeconds(10)));

            JobManager.AddJob(() => NextGame.SetClientTime(),
                s => s.WithName("setTime")
                .ToRunOnceAt(DateTime.UtcNow.AddSeconds(15)));

            JobManager.AddJob(async () => await InjuriesSeed.Initialize(_context),
                s => s.WithName("injuries")
                .ToRunOnceAt(DateTime.UtcNow.AddSeconds(20))
                .AndEvery(30)
                .Minutes());

            JobManager.AddJob(async () => await PhotosSeed.Initialize(_context),
                s => s.WithName("photos")
                .ToRunOnceAt(DateTime.UtcNow.AddMinutes(5))
                .AndEvery(1)
                .Days()
                .At(16, 00));   // 12p.m. Eastern Time
        }
    }
}
