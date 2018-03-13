using System;

namespace fantasy_hoops.Models.ViewModels
{
    public class RegisterViewModel
    {

        public String UserName { get; set; }
        public String Email { get; set; }
        public String Password { get; set; }
        public String PhoneNumber { get; set; }
        public int FavoriteTeam { get; set; }

    }
}
