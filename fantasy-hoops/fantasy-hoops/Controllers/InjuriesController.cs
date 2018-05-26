using System;
using System.Collections.Generic;
using System.Linq;
using fantasy_hoops.Database;
using fantasy_hoops.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class InjuriesController : Controller
    {

        private readonly InjuryRepository _repository;

        public InjuriesController()
        {
            GameContext context = new GameContext();
            _repository = new InjuryRepository(context);
        }

        [HttpGet]
        public IEnumerable<Object> Get()
        {
            return _repository.GetInjuries()
                .Select(x => new {
                    x.InjuryID,
                    date = x.Date,
                    Player = new {
                        x.Player.NbaID,
                        x.Player.FirstName,
                        x.Player.LastName,
                        x.Player.Position,
                        Team = new {
                            x.Player.Team.NbaID,
                            x.Player.Team.City,
                            x.Player.Team.Name,
                            x.Player.Team.Color
                        }
                    },
                    x.Status,
                    x.Injury,
                    x.Title,
                    x.Description,
                    x.Link})
                    .OrderByDescending(inj => inj.date)
                    .ToList();
        }

    }
}