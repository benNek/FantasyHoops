using fantasy_hoops.Services;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;

namespace fantasy_hoops.tests
{
    [TestFixture]
    class ScoreServiceTests
    {

        private readonly ScoreService _service;
        public ScoreServiceTests()
        {
            _service = new ScoreService();
        }

        [Test]
        public void ReturnCorrectValue()
        {
            var value = _service.GetFantasyPoints();
            Assert.AreEqual(value, 0D);
        }

    }
}
