using System.ComponentModel.DataAnnotations.Schema;

namespace fantasy_hoops.Models.Notifications
{
    public class FriendRequestNotification : Notification
    {
        public string FriendID { get; set; }
        public string RequestMessage { get; set; }

        [ForeignKey("FriendID")]
        public virtual User Friend { get; set; }
    }
}
