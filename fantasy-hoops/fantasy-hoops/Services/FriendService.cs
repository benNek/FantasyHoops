using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using fantasy_hoops.Database;
using fantasy_hoops.Models;
using fantasy_hoops.Models.Notifications;
using fantasy_hoops.Models.ViewModels;
using fantasy_hoops.Repositories;
using Microsoft.EntityFrameworkCore;

namespace fantasy_hoops.Services
{
    public class FriendService : IFriendService
    {

        private readonly GameContext _context;
        private readonly FriendRepository _repository;
        private readonly NotificationRepository _notificationRepository;

        public FriendService(GameContext context)
        {
            _context = context;
            _repository = new FriendRepository(_context);
            _notificationRepository = new NotificationRepository(_context);
        }

        public async void AcceptRequest(FriendRequestViewModel model, FriendRequest request)
        {
            _repository.UpdateRequest(request, model.ReceiverID, model.SenderID, RequestStatus.ACCEPTED);
            _notificationRepository.AddFriendRequestNotification(model.ReceiverID, model.SenderID, "Accepted your friend request.");

            await _context.SaveChangesAsync();
        }

        public async void CancelRequest(FriendRequestViewModel model, FriendRequest request)
        {
            _repository.UpdateRequest(request, model.SenderID, model.ReceiverID, RequestStatus.CANCELED);
            _notificationRepository.RemoveFriendRequestNotification(model.ReceiverID, model.SenderID);

            await _context.SaveChangesAsync();
        }

        public async void RemoveRequest(FriendRequestViewModel model, FriendRequest request)
        {
            _repository.UpdateRequest(request, model.SenderID, model.ReceiverID, RequestStatus.CANCELED);

            _notificationRepository.RemoveFriendRequestNotification(model.SenderID, model.ReceiverID);
            _notificationRepository.RemoveFriendRequestNotification(model.ReceiverID, model.SenderID);

            await _context.SaveChangesAsync();
        }

        public async void SendRequest(FriendRequestViewModel model)
        {
            var request = _repository.GetRequest(model.SenderID, model.ReceiverID);

            if (request == null)
                request = _repository.GetRequest(model.ReceiverID, model.SenderID);

            if (request == null)
                _repository.CreateRequest(model.SenderID, model.ReceiverID, RequestStatus.PENDING);
            else
                _repository.UpdateRequest(request, model.SenderID, model.ReceiverID, RequestStatus.PENDING);

            _notificationRepository.AddFriendRequestNotification(model.ReceiverID, model.SenderID, "Sent you a friend request.");

            await _context.SaveChangesAsync();
        }

    }
}
