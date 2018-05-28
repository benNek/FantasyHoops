using fantasy_hoops.Controllers;
using fantasy_hoops.Models;
using fantasy_hoops.Models.ViewModels;
using fantasy_hoops.Repositories;
using fantasy_hoops.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;

namespace fantasy_hoops.tests
{
    [TestFixture]
    class FriendControllerTests
    {

        private readonly FriendRequestController _controller;
        private readonly IFriendRepository _repository;

        public FriendControllerTests()
        {
            _repository = new TestFriendRepository();
            _controller = new FriendRequestController(_repository, new TestFriendService(_repository));
        }


        [Test]
        public void FriendRequest_SendRequest_Sucess()
        {
            FriendRequestViewModel model = GetModel();
            var result = _controller.Send(model);

            Assert.IsTrue(result.GetType().Equals(typeof(OkObjectResult)));

            var status = _repository.GetStatus(model.ReceiverID, model.SenderID);
            Assert.IsNotNull(status);
            // If request has been succesfully added, then it's status should be PENDING
            Assert.AreEqual(status, RequestStatus.PENDING);
        }

        [Test, Order(1)]
        public void FriendRequest_AcceptRequest_NotFound()
        {
            FriendRequestViewModel model = GetModel();
            var result = _controller.Accept(model);

            Assert.IsTrue(result.GetType().Equals(typeof(NotFoundObjectResult)));
        }

        [Test]
        public void FriendRequest_AcceptRequest_Success()
        {
            FriendRequestViewModel model = GetModel();
            _controller.Send(model);

            var result = _controller.Accept(GetInverseModel());
            Assert.IsTrue(result.GetType().Equals(typeof(OkObjectResult)));

            var status = _repository.GetStatus(model.ReceiverID, model.SenderID);
            Assert.IsNotNull(status);
            // If request has been succesfully accepted, then it's status should be ACCEPTED
            Assert.AreEqual(status, RequestStatus.ACCEPTED);
        }

        [Test, Order(2)]
        public void FriendRequest_CancelRequest_NotFound()
        {
            FriendRequestViewModel model = GetInverseModel();
            var result = _controller.Cancel(model);

            Assert.IsTrue(result.GetType().Equals(typeof(NotFoundObjectResult)));
        }

        [Test]
        public void FriendRequest_CancelRequest_Sucess()
        {
            FriendRequestViewModel model = GetModel();
            _controller.Send(model);

            var result = _controller.Cancel(GetModel());
            Assert.IsTrue(result.GetType().Equals(typeof(OkObjectResult)));

            var status = _repository.GetStatus(model.ReceiverID, model.SenderID);
            Assert.IsNotNull(status);
            // If request has been succesfully canceled, then it's status should be CANCELED
            Assert.AreEqual(status, RequestStatus.CANCELED);
        }

        [Test, Order(3)]
        public void FriendRequest_RemoveRequest_NotFound()
        {
            FriendRequestViewModel model = GetModel();
            var result = _controller.Remove(model);


            Assert.IsTrue(result.GetType().Equals(typeof(NotFoundObjectResult)));
        }

        [Test]
        public void FriendRequest_RemoveRequest_Success()
        {
            FriendRequestViewModel model = GetModel();
            _controller.Send(model);

            var result = _controller.Remove(GetModel());
            Assert.IsTrue(result.GetType().Equals(typeof(OkObjectResult)));

            var status = _repository.GetStatus(model.ReceiverID, model.SenderID);
            Assert.IsNotNull(status);
            // If request has been succesfully removed, then it's status should be CANCELED
            Assert.AreEqual(status, RequestStatus.CANCELED);
        }

        private FriendRequestViewModel GetModel()
        {
            return new FriendRequestViewModel
            {
                SenderID = "SENDER",
                ReceiverID = "RECEIVER"
            };
        }

        private FriendRequestViewModel GetInverseModel()
        {
            return new FriendRequestViewModel
            {
                SenderID = "RECEIVER",
                ReceiverID = "SENDER"
            };
        }

    }
}
