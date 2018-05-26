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
        IQueryable<FriendRequest> GetPendingRequests(String id);
        IQueryable<FriendRequest> GetIncomingRequests(String id);
        FriendRequest GetRequest(String senderID, String receiverID);
        void CreateRequest(String senderID, String receiverID, RequestStatus status);
        void UpdateRequest(FriendRequest request, String senderID, String receiverID, RequestStatus status);

    }
}
