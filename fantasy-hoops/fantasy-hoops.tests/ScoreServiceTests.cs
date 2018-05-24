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
        public void FantasyPoints_HakeemStats_Calculated()
        {
            // One of most dominant perfomances of all time
            // https://www.basketball-reference.com/boxscores/198703100HOU.html
            var value = _service.GetFantasyPoints(38, 7, 10, 6, 7, 12, 4);
            Assert.AreEqual(value, 120.4D);
        }

        [Test]
        public void FantasyPoints_ZeroStats_ZeroPoints()
        {
            var value = _service.GetFantasyPoints(0, 0, 0, 0, 0, 0, 0);
            Assert.AreEqual(value, 0D);
        }

        [Test]
        public void FantasyPoints_Turnovers_Negative()
        {
            var value = _service.GetFantasyPoints(0, 0, 0, 0, 0, 0, 5);
            Assert.AreEqual(value, -5D);
        }

        [Test]
        public void GameScore_HakeemStats_Calculated()
        {
            var value = _service.GetGameScore(38, 14, 10, 7, 7, 6, 12, 29, 4, 5, 4);
            Assert.AreEqual(value, 44.4D);
        }

        [Test]
        public void GameScore_ZeroStats_ZeroScore()
        {
            var value = _service.GetGameScore(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            Assert.AreEqual(value, 0D);
        }

        [Test]
        public void GameScore_BadStats_NegativeScore()
        {
            var value = _service.GetGameScore(0, 0, 0, 0, 0, 0, 0, 3, 5, 5, 4);
            Assert.AreEqual(value, -10.1D);
        }

        [Test]
        public void Price_ZeroStats_ZeroPrice()
        {
            var value = _service.GetPrice(0.0, 0.0);
            Assert.AreEqual(value, 0);
        }

        [Test]
        public void Price_PositiveStats_Calculated()
        {
            var value = _service.GetPrice(60.4, 40.0);
            Assert.AreEqual(value, 140);
        }

    }
}
