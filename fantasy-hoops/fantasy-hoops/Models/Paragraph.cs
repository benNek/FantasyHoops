using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Models
{
    public class Paragraph
    {
        public int ParagraphID { get; set; }
        public string Content { get; set; }
        public int NewsID { get; set; }

        public virtual News News { get; set; }
    }
}
