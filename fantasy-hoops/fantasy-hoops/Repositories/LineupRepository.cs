using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using fantasy_hoops.Database;
using fantasy_hoops.Models;
using fantasy_hoops.Models.ViewModels;

namespace fantasy_hoops.Repositories
{
    public class LineupRepository : ILineupRepository
    {

        private readonly GameContext _context;

        public LineupRepository(GameContext context)
        {
            _context = context;
        }

        public IQueryable<Lineup> GetLineup(string id)
        {
            return _context.Lineups
                .Where(x => x.UserID.Equals(id) && x.Date == Database.NextGame.NEXT_GAME);
        }

        public void AddPlayer(String userID, String position, int playerID)
        {
            var player = new Lineup
            {
                UserID = userID,
                PlayerID = playerID,
                Position = position,
                Date = Database.NextGame.NEXT_GAME,
                Calculated = false
            };
            _context.Lineups.Add(player);
        }

        public void UpdatePlayer(String userID, String position, int playerID)
        {
            var player = _context.Lineups
                    .Where(x => x.UserID.Equals(userID)
                            && x.Position.Equals(position)
                            && x.Date == Database.NextGame.NEXT_GAME)
                    .FirstOrDefault();

            player.PlayerID = playerID;
            player.FP = 0.0;
            player.Calculated = false;
        }

        public int GetLineupPrice(SubmitLineupViewModel model)
        {
            return _context.Players.Where(pg => pg.PlayerID == model.PgID).Select(p => p.Price)
                .Union(_context.Players.Where(sg => sg.PlayerID == model.SgID).Select(p => p.Price))
                .Union(_context.Players.Where(sf => sf.PlayerID == model.SfID).Select(p => p.Price))
                .Union(_context.Players.Where(pf => pf.PlayerID == model.PfID).Select(p => p.Price))
                .Union(_context.Players.Where(c => c.PlayerID == model.CID).Select(p => p.Price))
                .Sum();
        }

        public bool ArePricesCorrect(SubmitLineupViewModel model)
        {
            return !(IsPlayerPriceIncorrect(model.PgID, model.PgPrice)
                || IsPlayerPriceIncorrect(model.SgID, model.SgPrice)
                || IsPlayerPriceIncorrect(model.SfID, model.SfPrice)
                || IsPlayerPriceIncorrect(model.PfID, model.PfPrice)
                || IsPlayerPriceIncorrect(model.CID, model.CPrice));
        }

        public bool IsUpdating(String userID)
        {
            return _context.Lineups
                .Where(x => x.UserID.Equals(userID)
                        && x.Date == Database.NextGame.NEXT_GAME)
                .Any();
        }

        private bool IsPlayerPriceIncorrect(int playerID, int price)
        {
            return _context.Players.Where(pg => pg.PlayerID == playerID).Select(p => p.Price).FirstOrDefault() != price;
        }
    }
}
