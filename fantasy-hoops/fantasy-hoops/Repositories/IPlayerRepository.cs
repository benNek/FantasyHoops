using System;
using System.Linq;

namespace fantasy_hoops.Repositories
{
    interface IPlayerRepository
    {

        IQueryable<Object> GetActivePlayers();
        IQueryable<Object> GetPlayer(int id);

    }
}
