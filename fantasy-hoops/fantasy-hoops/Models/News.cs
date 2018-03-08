using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Models
{
    public class News
    {
        public int NewsID { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
    
        public virtual ICollection<Paragraph> Paragraphs { get; set; }
    }
}
