using fantasy_hoops.Database;
using System;
using System.Linq;

namespace fantasy_hoops.Repositories
{
    public class NewsRepository : INewsRepository
    {

        private readonly GameContext _context;

        public NewsRepository(GameContext context)
        {
            _context = context;
        }

        public IQueryable<Object> GetNews(int start, int count)
        {
            return _context.News
                .Select(x => new
                {
                    id = x.NewsID,
                    x.Title,
                    Paragraphs = x.Paragraphs.Select(y => y.Content).ToList(),
                    date = x.Date.ToString("yyyy-MM-dd"),
                    hTeam = _context.Teams.Where(y => y.NbaID == x.hTeamID).FirstOrDefault().Abbreviation,
                    vTeam = _context.Teams.Where(y => y.NbaID == x.vTeamID).FirstOrDefault().Abbreviation
                })
                .OrderByDescending(x => x.date)
                .Skip(start).Take(count);
        }

    }
}
