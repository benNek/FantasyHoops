using System;

namespace fantasy_hoops.Models
{
    public class UserPlayers
    {
        public int ID { get; set; }
        public DateTime Date { get; set; }
        public string UserID { get; set; }
        public int PlayerID { get; set; }
        public string Position { get; set; }
        public double FP { get; set; }

        public virtual User User { get; set; }
        public virtual Player Player { get; set; }
    }
}
