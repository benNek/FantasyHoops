using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Models
{
    public class Player
    {

        public int PlayerID { get; set; }
        public int NbaID { get; set; }
        public String Name { get; set; }
        public String Surname { get; set; }
        public int TeamID { get; set; }
        public double Points { get; set; }

        public virtual Team Team{ get; set; }

    }
}
