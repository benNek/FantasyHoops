import React, { Component } from 'react';
import { PlayerLeaderboardCard as Card } from './PlayerLeaderboardCard';
import leaderboardLogo from '../../content/images/leaderboard.png';
import shortid from 'shortid';
import { importAll } from '../../utils/reusableFunctions';

export class PlayerLeaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyPlayers: '',
      weeklyPlayers: '',
      monthlyPlayers: '',
      playerIMG: this.getPlayerImages(),
      posIMG: this.getPosImages(),
    }
  }

  componentDidMount() {
    fetch(`http://localhost:51407/api/leaderboard/player?type=daily`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          dailyPlayers: res,
        });
      })
    fetch(`http://localhost:51407/api/leaderboard/player?type=weekly`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          weeklyPlayers: res,
        });
      })
    fetch(`http://localhost:51407/api/leaderboard/player?type=monthly`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          monthlyPlayers: res,
        });
      })
  }

  render() {
    const dailyPlayers = this.createPlayers(this.state.dailyPlayers)
    const weeklyPlayers = this.createPlayers(this.state.weeklyPlayers)
    const monthlyPlayers = this.createPlayers(this.state.monthlyPlayers)
    return (
      <div className="container bg-light pt-2 pb-3">
        <div className="text-center pb-3">
          <img src={leaderboardLogo}
            alt=""
            width="60rem"
          />
          <h3>Top NBA Players</h3>
        </div>
        <ul className="nav nav-tabs justify-content-center mx-auto" id="myTab" role="tablist" style={{ width: '40%' }}>
          <li className="nav-item">
            <a className="nav-link active" id="daily-tab" data-toggle="tab" href="#daily" role="tab">Daily</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="weekly-tab" data-toggle="tab" href="#weekly" role="tab">Weekly</a>
          </li><li className="nav-item">
            <a className="nav-link" id="monthly-tab" data-toggle="tab" href="#monthly" role="tab">Monthly</a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="pt-4 pb-1 tab-pane fade show active" id="daily" role="tabpanel">
            {dailyPlayers.length > 0 ? dailyPlayers : "No players to display."}
          </div>
          <div className="pt-4 pb-1 tab-pane fade" id="weekly" role="tabpanel">
            {weeklyPlayers.length > 0 ? weeklyPlayers : "No players to display."}
          </div>
          <div className="pt-4 pb-1 tab-pane fade" id="monthly" role="tabpanel">
            {monthlyPlayers.length > 0 ? monthlyPlayers : "No players to display."}
          </div>
        </div>
      </div>
    );
  }

  createPlayers(players) {
    return _.map(
      players,
      (player, index) => {
        {
          return <Card
            index={index}
            key={shortid()}
            avatar={this.state.playerIMG[`${player.nbaID}.png`] || this.state.posIMG[`${player.position.toLowerCase()}.png`]}
            teamColor={player.teamColor}
            firstName={player.firstName}
            lastName={player.lastName}
            fp={player.fp}
          />
        }
      }
    );
  }

  getPlayerImages() {
    try {
      return importAll(require.context('../../content/images/players', false, /\.(png|jpe?g|svg)$/))
    }
    catch (err) {
      return ''
    }
  }

  getPosImages() {
    try {
      return importAll(require.context('../../content/images/positions', false, /\.(png|jpe?g|svg)$/))
    }
    catch (err) {
      return ''
    }
  }
}
