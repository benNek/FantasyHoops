using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace fantasy_hoops.Models
{
    public class User : IdentityUser
    {
        public String Description { get; set; }
        public int FavoriteTeamId { get; set; }
        public virtual Team Team { get; set; }

        public virtual ICollection<UserPlayers> UserPlayers { get; set; }
    }
}
