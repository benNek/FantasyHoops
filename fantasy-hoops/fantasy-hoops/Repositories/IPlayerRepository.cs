using fantasy_hoops.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Repositories
{
    interface IPlayerRepository
    {

        IQueryable<Player> GetActivePlayers();
        IQueryable<Player> GetPlayer(int id);

    }
}
