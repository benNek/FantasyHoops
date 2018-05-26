using System;

namespace fantasy_hoops.Models.ViewModels
{
    public class EditProfileViewModel
    {
        public String Id { get; set; }
        public String UserName { get; set; }
        public String Description { get; set; }
        public String Email { get; set; }
        public int FavoriteTeamId { get; set; }
        public String CurrentPassword { get; set; }
        public String NewPassword { get; set; }
      
    }
}
