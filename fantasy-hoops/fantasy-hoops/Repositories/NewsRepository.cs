using fantasy_hoops.Database;
using fantasy_hoops.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Repositories
{
    public class NewsRepository : INewsRepository
    {

        private readonly GameContext _context;

        public NewsRepository(GameContext context)
        {
            _context = context;
        }

        public IQueryable<News> GetNews()
        {
            return _context.News;
        }

    }
}
