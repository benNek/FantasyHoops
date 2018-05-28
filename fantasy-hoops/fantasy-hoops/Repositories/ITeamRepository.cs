using fantasy_hoops.Models;
using System.Linq;

namespace fantasy_hoops.Repositories
{
    interface ITeamRepository
    {

        IQueryable<Team> GetTeams();
        Team GetTeam(int nbaID);
        Team GetTeamById(int id);

    }
}
