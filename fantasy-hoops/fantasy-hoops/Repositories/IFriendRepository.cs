using fantasy_hoops.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Repositories
{
    interface IFriendRepository
    {

        RequestStatus GetStatus(String receiverID, String senderID);
        List<FriendRequest> GetPendingRequests(String id);
        List<FriendRequest> GetAllRequests(String id);

    }
}
