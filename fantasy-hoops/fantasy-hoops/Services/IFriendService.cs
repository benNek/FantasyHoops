using fantasy_hoops.Models;
using fantasy_hoops.Models.ViewModels;

namespace fantasy_hoops.Services
{
    public interface IFriendService
    {

        void SendRequest(FriendRequestViewModel model);
        void AcceptRequest(FriendRequestViewModel model, FriendRequest request);
        void CancelRequest(FriendRequestViewModel model, FriendRequest request);
        void RemoveRequest(FriendRequestViewModel model, FriendRequest request);

    }
}
