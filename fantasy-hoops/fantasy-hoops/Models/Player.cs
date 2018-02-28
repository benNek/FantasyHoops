using fantasy_hoops.Enums;
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
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public int TeamID { get; set; }
        public Position Position { get; set; }
        public int Number { get; set; }

        public virtual Team Team{ get; set; }
    }
}
