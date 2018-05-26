﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using fantasy_hoops.Database;
using fantasy_hoops.Models;
using fantasy_hoops.Models.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace fantasy_hoops.Repositories
{
    public class FriendRepository : IFriendRepository
    {

        private readonly GameContext _context;

        public FriendRepository(GameContext context)
        {
            _context = context;
        }

        public void CreateRequest(string senderID, string receiverID, RequestStatus status)
        {
            var request = new FriendRequest
            {
                SenderID = senderID,
                ReceiverID = receiverID,
                Date = DateTime.UtcNow,
                Status = status
            };
            _context.FriendRequests.Add(request);
        }

        public IQueryable<FriendRequest> GetIncomingRequests(string id)
        {
            return _context.FriendRequests
                .Where(x => x.SenderID.Equals(id) && x.Status.Equals(RequestStatus.PENDING));
        }

        public IQueryable<FriendRequest> GetPendingRequests(string id)
        {            
            return _context.FriendRequests
                .Where(x => x.ReceiverID.Equals(id) && x.Status.Equals(RequestStatus.PENDING));
        }

        public FriendRequest GetRequest(string senderID, string receiverID)
        {
            return _context.FriendRequests
                 .Where(x => x.SenderID.Equals(senderID) && x.ReceiverID.Equals(receiverID))
                 .FirstOrDefault();
        }

        public RequestStatus GetStatus(string receiverID, string senderID)
        {
            var request = GetRequest(senderID, receiverID);

            if (request == null)
            {
                request = GetRequest(receiverID, senderID);

                if (request != null && request.Status.Equals(RequestStatus.PENDING))
                    return RequestStatus.PENDING_INCOMING;
            }

            if (request == null)
                return RequestStatus.NO_REQUEST;
            return request.Status;
        }

        public void UpdateRequest(FriendRequest request, string senderID, string receiverID, RequestStatus status)
        {
            request.SenderID = senderID;
            request.ReceiverID = receiverID;
            request.Date = DateTime.UtcNow;
            request.Status = status;
        }
    }
}
