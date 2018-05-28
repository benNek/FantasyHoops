using System;
using System.Linq;

namespace fantasy_hoops.Repositories
{
    interface IStatsRepository
    {

        IQueryable<Object> GetStats();
        IQueryable<Object> GetStats(int id, int start, int count);

    }
}
