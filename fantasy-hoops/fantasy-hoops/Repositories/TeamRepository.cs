using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using fantasy_hoops.Database;
using fantasy_hoops.Models;

namespace fantasy_hoops.Repositories
{
    public class TeamRepository : ITeamRepository
    {

        private readonly GameContext _context;

        public TeamRepository(GameContext context)
        {
            _context = context;
        }

        public Team GetTeam(int nbaID)
        {
            return _context.Teams
                .Where(x => x.NbaID == nbaID)
                .FirstOrDefault();
        }

        public IQueryable<Team> GetTeams()
        {
            return _context.Teams;
        }
    }
}
