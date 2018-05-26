using fantasy_hoops.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Repositories
{
    interface IUserRepository
    {

        IQueryable<Object> GetProfile(string id);
        User GetUser(string id);
        User GetUserByName(string username);
        IQueryable<Object> GetFriends(string id);
        IQueryable<Object> GetUserPool();
        bool UserExists(string username);
        bool EmailExists(string email);

    }
}
