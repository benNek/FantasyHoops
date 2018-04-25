using System.ComponentModel.DataAnnotations.Schema;

namespace fantasy_hoops.Models.Notifications
{
    public class InjuryNotification : Notification
    {
        public int InjuryID { get; set; }

        [ForeignKey("InjuryID")]
        public virtual Injuries Injury { get; set; }
    }
}
