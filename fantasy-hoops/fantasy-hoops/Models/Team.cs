using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Models
{
    public class Team
    {

        public int TeamID { get; set; }
        public int NbaID { get; set; }
        public String Name { get; set; }
        public String City { get; set; }
        public String Abbreviation { get; set; }
        public String Color{ get; set; }

        public virtual ICollection<Player> Players { get; set; }


    }
}
