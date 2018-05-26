using fantasy_hoops.Models;
using fantasy_hoops.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Repositories
{
    interface ILineupRepository
    {

        IQueryable<Lineup> GetLineup(String id);
        void AddPlayer(String userID, String position, int playerID);
        void UpdatePlayer(String userID, String position, int playerID);
        int GetLineupPrice(SubmitLineupViewModel model);
        bool ArePricesCorrect(SubmitLineupViewModel model);
        bool IsUpdating(String userID);


    }
}
