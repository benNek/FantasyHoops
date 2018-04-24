using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace fantasy_hoops.Models
{
    public class GSNotification
    {
        [Key]
        public int NotificationID { get; set; }
        public string UserID { get; set; }
        public bool ReadStatus { get; set; }
        public DateTime DateCreated { get; set; }
        public double Score { get; set; }

        [ForeignKey("UserID")]
        public virtual User User { get; set; }
    }
}
