using System.ComponentModel.DataAnnotations.Schema;

namespace fantasy_hoops.Models.Notifications
{
    public class InjuryNotification : Notification
    {
        public int PlayerID { get; set; }
        public string InjuryDescription { get; set; }
        public string InjuryStatus { get; set; }

        [ForeignKey("PlayerID")]
        public virtual Player Player { get; set; }
    }
}
