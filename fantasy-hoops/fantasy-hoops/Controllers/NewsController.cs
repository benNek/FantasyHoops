using fantasy_hoops.Database;
using Microsoft.AspNetCore.Mvc;
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
        public IEnumerable<Object> Get()
        {

            return context.News.Select(x => new
            {
                id = x.NewsID,
                x.Title,
                news = String.Join(String.Empty, x.Paragraphs.Select(y => y.Content).ToArray()),
                date = x.Date.ToString("yyyy-MM-dd"),
                hTeam = context.Teams.Where(y => y.NbaID == x.hTeamID).FirstOrDefault().Abbreviation,
                vTeam = context.Teams.Where(y => y.NbaID == x.vTeamID).FirstOrDefault().Abbreviation
            }).ToList();
        }
    }
}
