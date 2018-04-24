using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Models.ViewModels
{
    public class GSNotificationViewModel
    {
        public int NotificationID { get; set; }
        public string UserID { get; set; }
        public bool ReadStatus { get; set; }
        public DateTime DateCreated { get; set; }
        public double Score { get; set; }
    }
}
