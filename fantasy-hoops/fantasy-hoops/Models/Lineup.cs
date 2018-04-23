using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace fantasy_hoops.Models
{
    public class Lineup
    {
        public int ID { get; set; }
        public DateTime Date { get; set; }
        public string UserID { get; set; }
        public int PlayerID { get; set; }
        public string Position { get; set; }
        public double FP { get; set; }
        public bool Calculated { get; set; }

        [ForeignKey("UserID")]
        public virtual User User { get; set; }
        [ForeignKey("PlayerID")]
        public virtual Player Player { get; set; }
    }
}
