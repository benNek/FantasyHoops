using fantasy_hoops.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Services
{
    interface IFriendService
    {

        void SendFriendRequest(FriendRequestViewModel model);
        void AcceptFriendRequest(FriendRequestViewModel model);

    }
}
