using fantasy_hoops.Models;
using System;
using System.Linq;

namespace fantasy_hoops.Repositories
{
    interface IUserRepository
    {

        IQueryable<Object> GetProfile(string id, int start, int count);
        User GetUser(string id);
        User GetUserByName(string username);
        IQueryable<Object> GetFriends(string id);
        IQueryable<Object> GetUserPool();
        bool UserExists(string username);
        bool EmailExists(string email);

    }
}
