using fantasy_hoops.Database;
using fantasy_hoops.Models;
using System;
using System.Linq;

namespace fantasy_hoops.Repositories
{
    public class StatsRepository : IStatsRepository
    {

        private readonly GameContext _context;

        public StatsRepository(GameContext context)
        {
            _context = context;
        }

        public IQueryable<object> GetStats()
        {
            return _context.Players
                .Select(x => new
                {
                    x.PlayerID,
                    x.NbaID,
                    x.FirstName,
                    x.LastName,
                    x.Number,
                    x.Position,
                    x.PTS,
                    x.REB,
                    x.AST,
                    x.STL,
                    x.BLK,
                    x.TOV,
                    x.FPPG,
                    x.Price,
                    Team = new
                    {
                        x.TeamID,
                        x.Team.NbaID,
                        x.Team.Abbreviation,
                        x.Team.City,
                        x.Team.Name,
                        x.Team.Color
                    },
                    Games = _context.Stats.Where(s => s.PlayerID == x.PlayerID)
                        .Select(s => new
                        {
                            s.StatsID,
                            s.Date,
                            Opponent = _context.Teams.Where(t => t.NbaID == s.OppID)
                                .Select(t => new
                                {
                                    t.NbaID,
                                    t.Abbreviation
                                })
                                .FirstOrDefault(),
                            s.Score,
                            s.MIN,
                            s.FGM,
                            s.FGA,
                            s.FGP,
                            s.TPM,
                            s.TPA,
                            s.TPP,
                            s.FTM,
                            s.FTA,
                            s.FTP,
                            s.DREB,
                            s.OREB,
                            s.TREB,
                            s.AST,
                            s.BLK,
                            s.STL,
                            s.FLS,
                            s.TOV,
                            s.PTS,
                            s.GS,
                            s.FP,
                            s.Price
                        })
                        .OrderByDescending(s => s.Date)
                });
        }

        public IQueryable<object> GetStats(int id, int start, int count)
        {
            double maxPoints = 0, maxAssists = 0, maxTurnovers = 0,
            maxRebounds = 0, maxBlocks = 0, maxSteals = 0;
            foreach (Player p in _context.Players)
            {
                maxPoints = Math.Max(maxPoints, p.PTS);
                maxAssists = Math.Max(maxAssists, p.AST);
                maxTurnovers = Math.Max(maxTurnovers, p.TOV);
                maxRebounds = Math.Max(maxRebounds, p.REB);
                maxBlocks = Math.Max(maxBlocks, p.BLK);
                maxSteals = Math.Max(maxSteals, p.STL);
            }

            return _context.Players
                .Where(x => x.NbaID == id)
                .Select(x => new
                {
                    x.PlayerID,
                    x.NbaID,
                    x.FirstName,
                    x.LastName,
                    x.Number,
                    x.Position,
                    x.PTS,
                    x.REB,
                    x.AST,
                    x.STL,
                    x.BLK,
                    x.TOV,
                    x.FPPG,
                    x.Price,
                    Percentages = new
                    {
                        PTS = Math.Round(x.PTS / maxPoints * 100, 0),
                        AST = Math.Round(x.AST / maxAssists * 100, 0),
                        TOV = Math.Round(x.TOV / maxTurnovers * 100, 0),
                        REB = Math.Round(x.REB / maxRebounds * 100, 0),
                        BLK = Math.Round(x.BLK / maxBlocks * 100, 0),
                        STL = Math.Round(x.STL / maxSteals * 100, 0)
                    },
                    Team = new
                    {
                        x.TeamID,
                        x.Team.NbaID,
                        x.Team.Abbreviation,
                        x.Team.City,
                        x.Team.Name,
                        x.Team.Color
                    },
                    Games = _context.Stats.Where(s => s.PlayerID == x.PlayerID)
                    .OrderByDescending(s => s.Date)
                    .Skip(start)
                    .Take(count)
                    .Select(s => new
                    {
                        s.StatsID,
                        s.Date,
                        Opponent = _context.Teams.Where(t => t.NbaID == s.OppID)
                            .Select(t => new
                            {
                                t.NbaID,
                                t.Abbreviation
                            })
                            .FirstOrDefault(),
                        s.Score,
                        s.MIN,
                        s.FGM,
                        s.FGA,
                        s.FGP,
                        s.TPM,
                        s.TPA,
                        s.TPP,
                        s.FTM,
                        s.FTA,
                        s.FTP,
                        s.DREB,
                        s.OREB,
                        s.TREB,
                        s.AST,
                        s.BLK,
                        s.STL,
                        s.FLS,
                        s.TOV,
                        s.PTS,
                        s.GS,
                        s.FP,
                        s.Price
                    })
                });
        }
    }
}
