using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fantasy_hoops.Services
{
    interface IScoreService
    {

        double GetGameScore();
        double GetFantasyPoints();

    }
}
