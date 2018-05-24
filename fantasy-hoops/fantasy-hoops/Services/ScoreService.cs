using fantasy_hoops.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Services
{
    public class ScoreService : IScoreService
    {

        private readonly GameContext _context;

        public ScoreService()
        {
            _context = new GameContext();
        }

        public double GetFantasyPoints()
        {
            return 0;
        }

        public double GetGameScore()
        {
            throw new NotImplementedException();
        }
    }
}
