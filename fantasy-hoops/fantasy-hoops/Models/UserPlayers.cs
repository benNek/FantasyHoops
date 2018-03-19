using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace fantasy_hoops.Models
{
    public class UserPlayers
    {
      //  [Key]
       // public int UserPlayersID { get; set; }
     //   [Key, Column(Order = 0)]
        public int ID { get; set; }
     //   [Key, Column(Order = 1)]
        public int PlayerID { get; set; }

        public virtual User User { get; set; }
        public virtual Player Player { get; set; }
    }
}
