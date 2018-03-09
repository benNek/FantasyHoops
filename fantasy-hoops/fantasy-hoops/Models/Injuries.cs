using System;
using System.ComponentModel.DataAnnotations;

namespace fantasy_hoops.Models
{
    public class Injuries
    {
        [Key]
        public int InjuryID { get; set; }
        public int PlayerID { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Injury { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Link { get; set; }

        public virtual Player Player { get; set; }
    }
}
