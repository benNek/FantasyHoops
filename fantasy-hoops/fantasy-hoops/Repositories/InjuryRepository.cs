using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using fantasy_hoops.Database;
using fantasy_hoops.Models;

namespace fantasy_hoops.Repositories
{
    public class InjuryRepository : IInjuryRepository
    {

        private readonly GameContext _context;
        public InjuryRepository(GameContext context)
        {
            _context = context;
        }

        public IQueryable<Injuries> GetInjuries()
        {
            return _context.Injuries;
        }

    }
}
