import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import shortid from 'shortid';
import moment from 'moment';
import _ from 'lodash';

export class PlayerModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let stats = '';
    let teamLogo = '';
    let rows = '';
    let chartData = this.getChartData('null', 'null');
    if (this.props.stats) {
      chartData = this.getChartData('Points', 'pts');
      stats = this.props.stats;
      teamLogo = `http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/${stats.team.abbreviation}.svg`;
      rows = _.map(stats.games, (s) => {
        let score = '';
        var str = s.score.split('-');
        if (parseInt(str[0]) > parseInt(str[1]))
          score = <span className="text-success">W</span>;
        else score = <span className="text-danger">L</span>;
        return <tr key={shortid()} >
          <td>{moment(s.date).format("ddd MM/D")}</td>
          <td><img src={`http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/${s.opponent.abbreviation}.svg`} alt={s.opponent.abbreviation} width='40rem' style={{ right: '0' }} /></td>
          <td>{score} {s.score}</td>
          <td>{s.min}</td>
          <td>{s.fgm}</td>
          <td>{s.fga}</td>
          <td>{s.fgp}</td>
          <td>{s.tpm}</td>
          <td>{s.tpa}</td>
          <td>{s.tpp}</td>
          <td>{s.ftm}</td>
          <td>{s.fta}</td>
          <td>{s.ftp}</td>
          <td>{s.dreb}</td>
          <td>{s.oreb}</td>
          <td>{s.treb}</td>
          <td>{s.ast}</td>
          <td>{s.blk}</td>
          <td>{s.stl}</td>
          <td>{s.fls}</td>
          <td>{s.tov}</td>
          <td>{s.pts}</td>
          <td>{s.gs}</td>
          <td>{s.fp}</td>
        </tr>;
      });
    }
    return (
      <div className="modal fade" id="playerModal" tabIndex="-1" role="dialog" aria-labelledby="playerModalLabel" aria-hidden="true">
        <div style={{ minWidth: '75rem' }} className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-right mr-2">
                <a className="close" data-dismiss="modal" aria-label="Close" style={{ right: '0' }}>
                  <span aria-hidden="true">&times;</span>
                </a>
              </div>
              <div className="row">
                <div style={{ width: '16.25rem', height: '9.35rem' }}></div>
                <img className="img-modal" src={teamLogo} />
                <img className="ml-3 img-modal" src={this.props.image} style={{ zIndex: '1' }} />
                <div className="col">
                  <h1 className="">{stats ? stats.firstName : ''} {stats ? stats.lastName : ''}</h1>
                  <h5>{stats.position} | {stats ? stats.team.city + " " + stats.team.name : ''}</h5>
                  <h5>#{stats.number}</h5>
                </div>
              </div>
              <nav>
                <div className="nav nav-tabs justify-content-end" id="nav-tab" role="tablist" style={{ position: 'static' }}>
                  <a className="nav-item nav-link active btn-no-otline" id="nav-stats-tab" data-toggle="tab" href="#nav-stats" role="tab" aria-controls="nav-stats" aria-selected="true">Season stats</a>
                  <a className="nav-item nav-link btn-no-otline" id="nav-gamelog-tab" data-toggle="tab" href="#nav-gamelog" role="tab" aria-controls="nav-gamelog" aria-selected="false">Gamelog</a>
                  <a className="nav-item nav-link btn-no-otline" id="nav-charts-tab" data-toggle="tab" href="#nav-charts" role="tab" aria-controls="nav-charts" aria-selected="false">Charts</a>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-stats" role="tabpanel" aria-labelledby="nav-stats-tab">
                  <table className="table table-sm table-hover table-bordered text-right">
                    <thead>
                      <tr>
                        <th scope="col">PTS</th>
                        <th scope="col">REB</th>
                        <th scope="col">AST</th>
                        <th scope="col">STL</th>
                        <th scope="col">BLK</th>
                        <th scope="col">TOV</th>
                        <th scope="col">FPPG</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{stats ? stats.pts : ''}</td>
                        <td>{stats ? stats.reb : ''}</td>
                        <td>{stats ? stats.ast : ''}</td>
                        <td>{stats ? stats.stl : ''}</td>
                        <td>{stats ? stats.blk : ''}</td>
                        <td>{stats ? stats.tov : ''}</td>
                        <td>{stats ? stats.fppg.toFixed(1) : ''}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="tab-pane fade" id="nav-gamelog" role="tabpanel" aria-labelledby="nav-gamelog-tab">
                  <table className="table table-sm table-hover table-bordered text-right">
                    <thead>
                      <tr>
                        <th scope="col">DATE</th>
                        <th scope="col">OPP</th>
                        <th scope="col">SCORE</th>
                        <th scope="col">MIN</th>
                        <th scope="col">FGM</th>
                        <th scope="col">FGA</th>
                        <th scope="col">FG%</th>
                        <th scope="col">3PM</th>
                        <th scope="col">3PA</th>
                        <th scope="col">3P%</th>
                        <th scope="col">FTM</th>
                        <th scope="col">FTA</th>
                        <th scope="col">FT%</th>
                        <th scope="col">DREB</th>
                        <th scope="col">OREB</th>
                        <th scope="col">TREB</th>
                        <th scope="col">AST</th>
                        <th scope="col">BLK</th>
                        <th scope="col">STL</th>
                        <th scope="col">FLS</th>
                        <th scope="col">TOV</th>
                        <th scope="col">PTS</th>
                        <th scope="col">GS</th>
                        <th scope="col">FP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows}
                    </tbody>
                  </table>
                </div>
                <div className="tab-pane fade" id="nav-charts" role="tabpanel" aria-labelledby="nav-charts-tab">
                  <Line data={chartData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getChartData(title, criteria) {
    if (title == 'null') {
      const data = {
        labels: labels,
        datasets: [
          {
            label: title
          }
        ]
      }
      return data;
    }
    let labels = [];
    let values = [];

    const games = this.props.stats.games;
    games.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    games.forEach(game => {
      labels.push(game.date.substring(5, 10));
      values.push(game[criteria]);
    });

    const data = {
      labels: labels,
      datasets: [
        {
          label: title,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: this.props.stats.team.color,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: values
        }
      ]
    };
    return data;
  }
}