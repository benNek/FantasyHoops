using fantasy_hoops.Models.ViewModels;
using System;
using System.Linq;

namespace fantasy_hoops.Repositories
{
    interface ILineupRepository
    {

        IQueryable<Object> GetLineup(String id);
        void AddPlayer(String userID, String position, int playerID);
        void UpdatePlayer(String userID, String position, int playerID);
        int GetLineupPrice(SubmitLineupViewModel model);
        bool ArePricesCorrect(SubmitLineupViewModel model);
        bool IsUpdating(String userID);


    }
}
