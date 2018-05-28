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
            return _repository.GetInjuries().ToList();
        }

    }
}