using System;
using System.Linq;

namespace fantasy_hoops.Repositories
{
    interface INewsRepository
    {

        IQueryable<Object> GetNews(int start, int count);

    }
}
