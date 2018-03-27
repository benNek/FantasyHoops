using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Models.ViewModels
{
    public class SumbitLineupViewModel
    {
        public string UserID { get; set; }
        public int PgID { get; set; }
        public int SgID { get; set; }
        public int SfID { get; set; }
        public int PfID { get; set; }
        public int CID { get; set; }
    }
}
