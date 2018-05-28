using fantasy_hoops.Models;
using System;
using System.Linq;

namespace fantasy_hoops.Repositories
{
    public interface IFriendRepository
    {

        RequestStatus GetStatus(String receiverID, String senderID);
        IQueryable<Object> GetPendingRequests(String id);
        IQueryable<Object> GetIncomingRequests(String id);
        FriendRequest GetRequest(String senderID, String receiverID);
        void CreateRequest(String senderID, String receiverID, RequestStatus status);
        void UpdateRequest(FriendRequest request, String senderID, String receiverID, RequestStatus status);

    }
}
