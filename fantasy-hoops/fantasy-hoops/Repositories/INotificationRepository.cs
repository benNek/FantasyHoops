using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Repositories
{
    interface INotificationRepository
    {

        void AddFriendRequestNotification(String userID, String friendID, String message);
        void RemoveFriendRequestNotification(String userID, String friendID);

    }
}
