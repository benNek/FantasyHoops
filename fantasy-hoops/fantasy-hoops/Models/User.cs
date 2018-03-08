using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Models
{
    public class User
    {
        public String UserID { get; set; }

        [Required]
        public String Username { get; set; }
        [Required]
        public String Password { get; set; }
        [Required]
        public String Email { get; set; }

        public String Phone { get; set; }
        public String FavoriteTeam { get; set; }
        public String Description { get; set; }
    }
}
