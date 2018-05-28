using fantasy_hoops.Models;
using fantasy_hoops.Models.ViewModels;
using fantasy_hoops.Repositories;

namespace fantasy_hoops.Services
{
    public class TestFriendService : IFriendService
    {

        private readonly IFriendRepository _repository;

        public TestFriendService(IFriendRepository repository)
        {
            _repository = repository;
        }

        public void AcceptRequest(FriendRequestViewModel model, FriendRequest request)
        {
            _repository.UpdateRequest(request, model.ReceiverID, model.SenderID, RequestStatus.ACCEPTED);
        }

        public void CancelRequest(FriendRequestViewModel model, FriendRequest request)
        {
            _repository.UpdateRequest(request, model.SenderID, model.ReceiverID, RequestStatus.CANCELED);
        }

        public void RemoveRequest(FriendRequestViewModel model, FriendRequest request)
        {
            _repository.UpdateRequest(request, model.SenderID, model.ReceiverID, RequestStatus.CANCELED);
        }

        public void SendRequest(FriendRequestViewModel model)
        {
            var request = _repository.GetRequest(model.SenderID, model.ReceiverID);

            if (request == null)
                request = _repository.GetRequest(model.ReceiverID, model.SenderID);

            if (request == null)
                _repository.CreateRequest(model.SenderID, model.ReceiverID, RequestStatus.PENDING);
            else
                _repository.UpdateRequest(request, model.SenderID, model.ReceiverID, RequestStatus.PENDING);
        }
    }
}
