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

            JobManager.AddJob(() => Task.Run(() => InjuriesSeed.Initialize(_context)), s => s.WithName("injuries")
                .ToRunNow()
                .AndEvery(33)
                .Minutes());

            JobManager.AddJob(() => Task.Run(() => PhotosSeed.Initialize(_context)), s => s.WithName("photos")
                .ToRunOnceAt(DateTime.UtcNow.AddMinutes(15))
                .AndEvery(1)
                .Days()
                .At(16, 00));   // 12p.m. Eastern Time

            JobManager.AddJob(() => Task.Run(() => StatsSeed.Initialize(_context)), s => s.WithName("stats")
                .ToRunOnceAt(DateTime.UtcNow.AddSeconds(20)));

            JobManager.AddJob(() => Task.Run(() => UserScoreSeed.Initialize(_context)), s => s.WithName("userScore")
                .ToRunOnceAt(DateTime.UtcNow.AddMinutes(8)));

            JobManager.AddJob(() => Task.Run(() => PlayerSeed.Initialize(_context)), s => s.WithName("playerSeed")
                .ToRunOnceAt(DateTime.Now.AddMinutes(5)));

            JobManager.AddJob(() => Task.Run(() => NewsSeed.Initialize(_context)), s => s.WithName("news")
                .ToRunOnceAt(DateTime.UtcNow.AddMinutes(11))
                .AndEvery(1)
                .Days()
                .At(7, 30));   // 3:30 a.m. Eastern Time

            JobManager.AddJob(() => Task.Run(() => NextGame.Initialize()), s => s.WithName("nextGame")
                .ToRunNow());
        }
    }
}
