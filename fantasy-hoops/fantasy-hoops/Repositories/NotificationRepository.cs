using fantasy_hoops.Database;
using fantasy_hoops.Models.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Repositories
{
    public class NotificationRepository : INotificationRepository
    {

        private readonly GameContext _context;
        public NotificationRepository(GameContext context)
        {
            _context = context;
        }

        public void AddFriendRequestNotification(string userID, string friendID, string message)
        {
            var notification = new FriendRequestNotification
            {
                UserID = userID,
                FriendID = friendID,
                ReadStatus = false,
                DateCreated = DateTime.UtcNow,
                RequestMessage = message
            };

            _context.FriendRequestNotifications.Add(notification);
        }

        public void RemoveFriendRequestNotification(string userID, string friendID)
        {
            var notification = _context.FriendRequestNotifications
                .Where(x => x.UserID.Equals(userID) && x.FriendID.Equals(friendID))
                .FirstOrDefault();

            if (notification != null)
                _context.FriendRequestNotifications.Remove(notification);
        }
    }
}
