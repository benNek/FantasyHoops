using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using fantasy_hoops.Database;
using fantasy_hoops.Models;
using fantasy_hoops.Models.ViewModels;

namespace fantasy_hoops.Repositories
{
    public class FriendRepository : IFriendRepository
    {

        private readonly GameContext _context;
        public FriendRepository()
        {
            _context = new GameContext();
        }

        public List<FriendRequest> GetAllRequests(string id)
        {
            throw new NotImplementedException();
        }

        public List<FriendRequest> GetPendingRequests(string id)
        {
            /*
            var data = _context.FriendRequests
                .Where(x => x.ReceiverID.Equals(id) && x.Status.Equals(RequestStatus.PENDING))
                .Select(x => new
                {
                    x.Sender.UserName,
                    x.Sender.Id
                })
                .ToList();

            return data;
            */
            
            var data = _context.FriendRequests
                .Where(x => x.ReceiverID.Equals(id) && x.Status.Equals(RequestStatus.PENDING))
                /*.Select(x => new
                {
                    x.Sender.UserName,
                    x.Sender.Id
                })*/
                .ToList();

            return data;
        }

        public RequestStatus GetStatus(string receiverID, string senderID)
        {
            var request = _context.FriendRequests
                .Where(x => x.SenderID.Equals(senderID) && x.ReceiverID.Equals(receiverID))
                .FirstOrDefault();

            if (request == null)
            {
                request = _context.FriendRequests
                    .Where(x => x.SenderID.Equals(receiverID) && x.ReceiverID.Equals(senderID))
                    .FirstOrDefault();

                if (request != null && request.Status.Equals(RequestStatus.PENDING))
                    return RequestStatus.PENDING_INCOMING;
            }

            if (request == null)
                return RequestStatus.NO_REQUEST;
            return request.Status;
        }
    }
}
