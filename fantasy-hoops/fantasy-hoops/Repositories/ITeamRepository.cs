using fantasy_hoops.Models;
using System;
using System.Linq;

namespace fantasy_hoops.Repositories
{
    interface ITeamRepository
    {

        IQueryable<Object> GetTeams();
        Team GetTeam(int nbaID);
        Team GetTeamById(int id);

    }
}
