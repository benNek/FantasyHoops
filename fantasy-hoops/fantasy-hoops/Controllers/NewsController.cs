using fantasy_hoops.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class NewsController
    {

        private readonly GameContext context;

        public NewsController()
        {
            context = new GameContext();
        }

        [HttpGet]
        public IEnumerable<Object> Get(int start = 0, int count = 6)
        {
            var news = context.News.Select(x => new
            {
                id = x.NewsID,
                x.Title,
                Paragraphs = x.Paragraphs.Select(y => y.Content).ToList(),
                date = x.Date.ToString("yyyy-MM-dd"),
                hTeam = context.Teams.Where(y => y.NbaID == x.hTeamID).FirstOrDefault().Abbreviation,
                vTeam = context.Teams.Where(y => y.NbaID == x.vTeamID).FirstOrDefault().Abbreviation
            })
            .OrderByDescending(x => x.date)
            .Skip(start).Take(count).ToList();
            return news;
        }
    }
}
