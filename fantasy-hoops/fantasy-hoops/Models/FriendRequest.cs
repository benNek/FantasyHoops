using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Models
{

    public enum RequestStatus
    {
        PENDING, ACCEPTED, DECLINED, CANCELED
    }

    public class FriendRequest
    {

        public int ID { get; set; }
        public DateTime Date { get; set; }
        public String SenderID { get; set; }
        public String ReceiverID { get; set; }
        public RequestStatus Status { get; set; }

        [ForeignKey("SenderID")]
        public virtual User Sender { get; set; }
        [ForeignKey("ReceiverID")]
        public virtual User Receiver { get; set; }
    }
}
