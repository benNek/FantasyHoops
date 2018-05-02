using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

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
        public int GP { get; set; }
        public double PTS { get; set; }
        public double REB { get; set; }
        public double AST { get; set; }
        public double STL { get; set; }
        public double BLK { get; set; }
        public double TOV { get; set; }
        public double FPPG { get; set; }
        public int Price { get; set; }
        public int TeamID { get; set; }
        public bool IsPlaying { get; set; }
        public DateTime? StatusDate { get; set; }
        [Required, DefaultValue("Active")]
        public string Status { get; set; }

        public virtual Team Team { get; set; }
        public virtual ICollection<Stats> Stats { get; set; }
        public virtual ICollection<Lineup> Lineups { get; set; }
    }
}
