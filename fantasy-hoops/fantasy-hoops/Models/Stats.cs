namespace fantasy_hoops.Models
{
    public class GameLog
    {
        public int GameID { get; set; }
        public int PTS { get; set; }
        public int FGM { get; set; }
        public int OREB { get; set; }
        public int DREB { get; set; }
        public int STL { get; set; }
        public int AST { get; set; }
        public int BLK { get; set; }
        public int FGA { get; set; }
        public int FTM { get; set; }
        public int FTA { get; set; }
        public int FLS { get; set; }
        public int TOV { get; set; }

        public virtual Player Player { get; set; }
    }
}
