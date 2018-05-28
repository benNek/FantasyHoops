using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using fantasy_hoops.Database;
using fantasy_hoops.Models.ViewModels;
using fantasy_hoops.Repositories;

namespace fantasy_hoops.Services
{
    public class LineupService : ILineupService
    {

        private readonly GameContext _context;
        private readonly LineupRepository _repository;

        public LineupService(GameContext context)
        {
            _context = context;
            _repository = new LineupRepository(_context);
        }

        public async void SubmitLineup(SubmitLineupViewModel model)
        {
            if (!_repository.IsUpdating(model.UserID))
            {
                _repository.AddPlayer(model.UserID, "PG", model.PgID);
                _repository.AddPlayer(model.UserID, "SG", model.SgID);
                _repository.AddPlayer(model.UserID, "SF", model.SfID);
                _repository.AddPlayer(model.UserID, "PF", model.PfID);
                _repository.AddPlayer(model.UserID, "C", model.CID);
            }
            else
            {
                _repository.UpdatePlayer(model.UserID, "PG", model.PgID);
                _repository.UpdatePlayer(model.UserID, "SF", model.SgID);
                _repository.UpdatePlayer(model.UserID, "SF", model.SfID);
                _repository.UpdatePlayer(model.UserID, "PF", model.PfID);
                _repository.UpdatePlayer(model.UserID, "C", model.CID);
            }

            await _context.SaveChangesAsync();
        }

    }
}
