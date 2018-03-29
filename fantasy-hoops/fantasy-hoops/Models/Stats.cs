using System;

namespace fantasy_hoops.Models
{
    public class Stats
    {
        public int StatsID { get; set; }
        public DateTime Date { get; set; }
        public string Score { get; set; }
        public string MIN { get; set; }
        public int FGM { get; set; }
        public int FGA { get; set; }
        public double FGP { get; set; }
        public int TPM { get; set; }
        public int TPA { get; set; }
        public double TPP { get; set; }
        public int FTM { get; set; }
        public int FTA { get; set; }
        public double FTP { get; set; }
        public int OREB { get; set; }
        public int DREB { get; set; }
        public int TREB { get; set; }
        public int AST { get; set; }
        public int BLK { get; set; }
        public int STL { get; set; }
        public int FLS { get; set; }
        public int TOV { get; set; }
        public int PTS { get; set; }
        public double GS { get; set; }
        public double FP { get; set; }
        public int PlayerID { get; set; }
        public int OppID { get; set; }

        public virtual Player Player { get; set; }
    }
}
