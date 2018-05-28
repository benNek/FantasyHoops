using fantasy_hoops.Models;
using fantasy_hoops.Models.ViewModels;
using System.Collections.Generic;

namespace fantasy_hoops.Repositories
{
    interface INotificationRepository
    {

        IEnumerable<Notification> GetAllNotifications();
        IEnumerable<Notification> GetNotifications(string userID, int start, int count);
        void AddFriendRequestNotification(string userID, string friendID, string message);
        void RemoveFriendRequestNotification(string userID, string friendID);
        void ReadNotification(NotificationViewModel model);
        void ReadAllNotifications(string userID);

    }
}
