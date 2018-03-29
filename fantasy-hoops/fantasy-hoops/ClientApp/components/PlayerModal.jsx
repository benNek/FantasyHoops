import React, { Component } from 'react';
import shortid from 'shortid';
import moment from 'moment';
import _ from 'lodash';

export class PlayerModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let player = '';
    let teamLogo = '';
    let rows = '';
    if (this.props.player) {
      console.log(this.props.stats);
      player = this.props.player;
      teamLogo = `http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/${player.team.abbreviation}.svg`;
    }
    if (this.props.stats) {
      rows = _.map(this.props.stats.games, (s) => {
        return <tr key={shortid()} >
          <td>{moment(s.date).format("ddd MM/D")}</td>
          <td><img src={`http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/${s.opponent.abbreviation}.svg`} width='40rem' style={{right: '0'}}/> {s.opponent.abbreviation}</td>
          <td>{s.score}</td>
          <td>{s.min}</td>
          <td>{s.fgm}-{s.fga}</td>
          <td>{s.fgp}</td>
          <td>{s.tpm}-{s.tpa}</td>
          <td>{s.tpp}</td>
          <td>{s.ftm}-{s.fta}</td>
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
                <a type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ right: '0' }}>
                  <span aria-hidden="true">&times;</span>
                </a>
              </div>
              <div className="row">
                <div style={{ width: '16.25rem', height: '9.35rem' }}></div>
                <img className="img-modal" src={teamLogo} />
                <img className="ml-3 img-modal" src={this.props.image} style={{ zIndex: '1' }} />
                <div className="col">
                  <h1 className="">{player ? player.firstName : ''} {player ? player.lastName : ''}</h1>
                  <h5>{player.position} | {player ? player.team.city + " " + player.team.name : ''}</h5>
                  <h5>#{player.number}</h5>
                </div>
              </div>
              <nav>
                <div className="nav nav-tabs justify-content-end" id="nav-tab" role="tablist" style={{ position: 'static' }}>
                  <a className="nav-item nav-link active" id="nav-stats-tab" data-toggle="tab" href="#nav-stats" role="tab" aria-controls="nav-stats" aria-selected="true">Season stats</a>
                  <a className="nav-item nav-link" id="nav-gamelog-tab" data-toggle="tab" href="#nav-gamelog" role="tab" aria-controls="nav-gamelog" aria-selected="false">Gamelog</a>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-stats" role="tabpanel" aria-labelledby="nav-stats-tab">
                  <table className="table table-sm table-bordered">
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
                        <td>{player ? player.pts : ''}</td>
                        <td>{player ? player.reb : ''}</td>
                        <td>{player ? player.ast : ''}</td>
                        <td>{player ? player.stl : ''}</td>
                        <td>{player ? player.blk : ''}</td>
                        <td>{player ? player.tov : ''}</td>
                        <td>{player ? player.fppg.toFixed(1) : ''}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="tab-pane fade" id="nav-gamelog" role="tabpanel" aria-labelledby="nav-gamelog-tab">
                  <table className="table table-sm table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">DATE</th>
                        <th scope="col">OPP</th>
                        <th scope="col">SCORE</th>
                        <th scope="col">MIN</th>
                        <th scope="col">FGM-FGA</th>
                        <th scope="col">FG%</th>
                        <th scope="col">3PM-3PA</th>
                        <th scope="col">3P%</th>
                        <th scope="col">FTM-FTA</th>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}