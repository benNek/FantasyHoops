using System;

namespace fantasy_hoops.Models
{
    public class Player
    {

        public int PlayerID { get; set; }
        public int NbaID { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Position { get; set; }
        public int Number { get; set; }
        public int Price { get; set; }
        public int TeamID { get; set; }
        public virtual Team Team{ get; set; }
    }
}
