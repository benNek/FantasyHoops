using System;
using System.Collections.Generic;

namespace fantasy_hoops.Models
{
    public class Team
    {

        public int TeamID { get; set; }
        public int NbaID { get; set; }
        public String Name { get; set; }
        public String City { get; set; }
        public String Color { get; set; }

        public virtual ICollection<Player> Players { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
