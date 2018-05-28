using System;
using System.Linq;
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

        public IQueryable<Object> GetTeams()
        {
            return _context.Teams
                .Select(x => new
                {
                    x.TeamID,
                    x.NbaID,
                    x.City,
                    x.Name,
                    x.Color
                })
                .OrderBy(x => x.Name);
        }

        public Team GetTeam(int nbaID)
        {
            return _context.Teams
                .Where(x => x.NbaID == nbaID)
                .FirstOrDefault();
        }

        public Team GetTeamById(int id)
        {
            return _context.Teams
                .Where(x => x.TeamID == id)
                .FirstOrDefault();
        }
    }
}
