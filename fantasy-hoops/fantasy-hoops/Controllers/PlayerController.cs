using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using fantasy_hoops.Database;
using fantasy_hoops.Models;
using Microsoft.AspNetCore.Mvc;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class PlayerController : Controller
    {

        private readonly GameContext context;

        public PlayerController()
        {
            context = new GameContext();
        }

        [HttpGet]
        public IEnumerable<Player> Get()
        {
            return context.Players.ToList();
        }

        [HttpGet("{id}")]
        public Player Get(int id)
        {
            return context.Players.Where(x => x.NbaID == id).ToList().First();
        }
    }
}