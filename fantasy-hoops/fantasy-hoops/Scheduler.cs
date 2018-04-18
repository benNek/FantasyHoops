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

            JobManager.AddJob(() => Task.Run(() => NextGame.Initialize(_context)),
                s => s.WithName("nextGame")
                .ToRunOnceAt(DateTime.UtcNow.AddSeconds(10)));

            JobManager.AddJob(() => Task.Run(() => NextGame.SetClientTime()),
                s => s.WithName("setTime")
                .AndThen(() => NextGame.SetLastGame())
                .ToRunOnceAt(DateTime.UtcNow.AddSeconds(15)));

            JobManager.AddJob(() => Task.Run(() => InjuriesSeed.Initialize(_context)),
                s => s.WithName("injuries")
                .ToRunNow()
                .AndEvery(33)
                .Minutes());

            JobManager.AddJob(() => Task.Run(() => PhotosSeed.Initialize(_context)),
                s => s.WithName("photos")
                .ToRunOnceAt(DateTime.UtcNow.AddMinutes(15))
                .AndEvery(1)
                .Days()
                .At(16, 00));   // 12p.m. Eastern Time
        }
    }
}
