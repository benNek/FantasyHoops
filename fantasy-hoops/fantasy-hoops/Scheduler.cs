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

            JobManager.AddJob(() => Task.Run(() => InjuriesSeed.Initialize(_context)), s => s.WithName("injuries")
                .ToRunNow()
                .AndEvery(33)
                .Minutes());

            JobManager.AddJob(() => Task.Run(() => PhotosSeed.Initialize(_context)), s => s.WithName("photos")
                .ToRunOnceAt(DateTime.Now.AddMinutes(15))
                .AndEvery(1)
                .Days()
                .At(16, 00));

            JobManager.AddJob(() => Task.Run(() => StatsSeed.Initialize(_context)), s => s.WithName("stats")
                .ToRunOnceAt(DateTime.Now.AddSeconds(20)));

            JobManager.AddJob(() => Task.Run(() => UserScoreSeed.Initialize(_context)), s => s.WithName("userScore")
                .ToRunOnceAt(DateTime.Now.AddMinutes(8)));

            JobManager.AddJob(() => Task.Run(() => PlayerSeed.Initialize(_context)), s => s.WithName("playerSeed")
                .ToRunOnceAt(DateTime.Now.AddMinutes(5)));

            JobManager.AddJob(() => Task.Run(() => NewsSeed.Initialize(_context)), s => s.WithName("news")
                .ToRunOnceAt(DateTime.Now.AddMinutes(11))
                .AndEvery(1)
                .Days()
                .At(10, 30));

            JobManager.AddJob(() => Task.Run(() => NextGame.Initialize()), s => s.WithName("nextGame")
                .ToRunNow());
        }
    }
}
