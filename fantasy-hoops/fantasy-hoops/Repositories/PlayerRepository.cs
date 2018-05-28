using System;
using System.Linq;
using fantasy_hoops.Database;

namespace fantasy_hoops.Repositories
{
    public class PlayerRepository : IPlayerRepository
    {

        private readonly GameContext _context;

        public PlayerRepository(GameContext context)
        {
            _context = context;
        }

        public IQueryable<Object> GetActivePlayers()
        {
            return _context.Players.Where(x => x.IsPlaying)
                .Select(x => new
                {
                    x.FirstName,
                    x.LastName,
                    id = x.NbaID,
                    playerId = x.PlayerID,
                    x.Price,
                    x.Position,
                    TeamColor = x.Team.Color,
                    x.FPPG,
                    injuryStatus = x.Status
                })
                .OrderByDescending(p => p.Price);
        }

        public IQueryable<Object> GetPlayer(int id)
        {
            return _context.Players.Where(x => x.NbaID == id)
                .Select(x => new
                {
                    x.PlayerID,
                    x.NbaID,
                    x.FirstName,
                    x.LastName,
                    x.Number,
                    x.Position,
                    x.PTS,
                    x.REB,
                    x.AST,
                    x.STL,
                    x.BLK,
                    x.TOV,
                    x.FPPG,
                    x.Price,
                    injuryStatus = x.Status,
                    Team = new
                    {
                        x.TeamID,
                        x.Team.NbaID,
                        x.Team.Abbreviation,
                        x.Team.City,
                        x.Team.Name,
                        x.Team.Color
                    },
                });
        }
    }
}
