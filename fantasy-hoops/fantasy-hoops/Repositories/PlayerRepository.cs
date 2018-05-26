using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using fantasy_hoops.Database;
using fantasy_hoops.Models;

namespace fantasy_hoops.Repositories
{
    public class PlayerRepository : IPlayerRepository
    {

        private readonly GameContext _context;

        public PlayerRepository(GameContext context)
        {
            _context = context;
        }

        public IQueryable<Player> GetActivePlayers()
        {
            return _context.Players.Where(x => x.IsPlaying);
        }

        public IQueryable<Player> GetPlayer(int id)
        {
            return _context.Players.Where(x => x.NbaID == id);
        }
    }
}
