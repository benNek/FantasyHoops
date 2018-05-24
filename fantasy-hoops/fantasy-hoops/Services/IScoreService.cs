using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Services
{
    interface IScoreService
    {

        double GetGameScore(int points, int fieldGoalsMade, int offensiveRebounds,
            int defensiveRebounds, int steals, int assists, int blocks, int fieldGoalsAttempted,
            int freeThrowsMissed, int fouls, int turnovers);
        double GetFantasyPoints(int points, int defensiveRebounds, int offensiveRebounds,
            int assists, int steals, int blocks, int turnovers);

        int GetPrice(double fantasyPoints, double gameScore);

    }
}
