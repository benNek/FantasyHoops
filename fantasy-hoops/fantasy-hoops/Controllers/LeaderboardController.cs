using fantasy_hoops.Database;
using fantasy_hoops.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace fantasy_hoops.Controllers
{
    [Route("api/[controller]")]
    public class LeaderboardController : Controller
    {
        private readonly LeaderboardRepository _repository;

        public LeaderboardController()
        {
            _repository = new LeaderboardRepository(new GameContext());
        }

        [HttpGet("player")]
        public IEnumerable<Object> GetPlayerLeaderboard(int from = 0, int limit = 10, string type = "weekly")
        {
            return _repository.GetPlayerLeaderboard(from, limit, type).ToList();
        }


        [HttpGet("user")]
        public IEnumerable<Object> GetUserLeaderboard(int from = 0, int limit = 10, string type = "weekly")
        {
            return _repository.GetUserLeaderboard(from, limit, type).ToList();
        }

        [HttpGet("user/{id}")]
        public IEnumerable<Object> GetFriendsLeaderboard(string id, int from = 0, int limit = 10, string type = "weekly")
        {
            return _repository.GetFriendsLeaderboard(id, from, limit, type).ToList();
        }
    }
}
