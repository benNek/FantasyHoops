using fantasy_hoops.Database;
using fantasy_hoops.Models;
using fantasy_hoops.Models.Notifications;
using fantasy_hoops.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace fantasy_hoops.Repositories
{
    public class NotificationRepository : INotificationRepository
    {

        private readonly GameContext _context;
        public NotificationRepository(GameContext context)
        {
            _context = context;
        }

        public IEnumerable<Notification> GetAllNotifications()
        {
            return _context.Notifications.OfType<GameScoreNotification>()
                    .Include(gs => gs.User)
                    .AsEnumerable()
                    .OfType<Notification>()
                    .Union(_context.Notifications
                        .OfType<FriendRequestNotification>()
                        .Include(fr => fr.Friend))
                    .Union(_context.Notifications
                        .OfType<InjuryNotification>()
                        .Include(inj => inj.Player)
                        .ThenInclude(p => p.Team))
                    .OrderByDescending(y => y.DateCreated)
                    .ToList();
        }

        public IEnumerable<Notification> GetNotifications(string userID, int start, int count)
        {
            if (count == 0)
                count = _context.Notifications.Where(y => y.UserID.Equals(userID)).Count();
            return _context.Notifications
                    .OfType<GameScoreNotification>()
                    .Include(gs => gs.User)
                    .AsEnumerable()
                    .OfType<Notification>()
                    .Union(_context.Notifications
                        .OfType<FriendRequestNotification>()
                        .Include(fr => fr.Friend))
                    .Union(_context.Notifications
                        .OfType<InjuryNotification>()
                        .Include(inj => inj.Player)
                        .ThenInclude(p => p.Team))
                    .Where(y => y.UserID.Equals(userID))
                    .OrderByDescending(y => y.DateCreated)
                    .Skip(start)
                    .Take(count)
                    .ToList();
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

        public void ReadNotification(NotificationViewModel model)
        {
            _context.Notifications
                .Where(x => x.NotificationID == model.NotificationID
                        && x.UserID.Equals(model.UserID))
                .FirstOrDefault()
                .ReadStatus = true;

            _context.SaveChanges();
        }

        public void ReadAllNotifications(string userID)
        {
            _context.Notifications
                .Where(x => x.UserID.Equals(userID) && x.ReadStatus == false)
                .ToList()
                .ForEach(n => n.ReadStatus = true);

            _context.SaveChanges();
        }

    }
}
