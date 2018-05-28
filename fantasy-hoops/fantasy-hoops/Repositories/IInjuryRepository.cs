using System;
using System.Linq;

namespace fantasy_hoops.Repositories
{
    interface IInjuryRepository
    {

        IQueryable<Object> GetInjuries();

    }
}
