using fantasy_hoops.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Repositories
{
    interface ITeamRepository
    {

        IQueryable<Team> GetTeams();
        Team GetTeam(int nbaID);

    }
}
