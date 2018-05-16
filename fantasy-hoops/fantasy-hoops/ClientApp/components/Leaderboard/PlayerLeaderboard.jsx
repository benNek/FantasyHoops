import React, { Component } from 'react';
import { PlayerLeaderboardCard as Card } from './PlayerLeaderboardCard';
import leaderboardLogo from '../../content/images/leaderboard.png';
import shortid from 'shortid';
import { importAll } from '../../utils/reusableFunctions';
import { PlayerModal } from '../PlayerModal';
import { Loader } from '../Loader';
import { EmptyJordan } from '../EmptyJordan';

export class PlayerLeaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyPlayers: '',
      weeklyPlayers: '',
      monthlyPlayers: '',
      playerIMG: this.getPlayerImages(),
      posIMG: this.getPosImages(),
      stats: '',
      dailyLoader: true,
      weeklyLoader: true,
      monthlyLoader: true,
      modalLoader: true
    }

    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    $("#playerModal").on("hidden.bs.modal", () => {
      this.setState({
        modalLoader: true
      });
    });
  }

  async componentWillMount() {
    await fetch(`http://localhost:51407/api/leaderboard/player?type=daily`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          dailyPlayers: res,
          dailyLoader: false
        });
      })
    await fetch(`http://localhost:51407/api/leaderboard/player?type=weekly`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          weeklyPlayers: res,
          weeklyLoader: false
        });
      })
    await fetch(`http://localhost:51407/api/leaderboard/player?type=monthly`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          monthlyPlayers: res,
          monthlyLoader: false
        });
      })
  }

  async showModal(player) {
    await fetch(`http://localhost:51407/api/stats/${player.nbaID}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          stats: res,
          modalLoader: false
        });
      });
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
            <a className="nav-link active tab-no-outline" id="daily-tab" data-toggle="tab" href="#daily" role="tab">Daily</a>
          </li>
          <li className="nav-item">
            <a className="nav-link tab-no-outline" id="weekly-tab" data-toggle="tab" href="#weekly" role="tab">Weekly</a>
          </li><li className="nav-item">
            <a className="nav-link tab-no-outline" id="monthly-tab" data-toggle="tab" href="#monthly" role="tab">Monthly</a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="pt-4 pb-1 tab-pane fade show active" id="daily" role="tabpanel">
            {!this.state.dailyLoader
              ? dailyPlayers.length > 0
                ? dailyPlayers
                : <EmptyJordan message="Such empty..." />
              : <Loader show={this.state.dailyLoader} />}
          </div>
          <div className="pt-4 pb-1 tab-pane fade" id="weekly" role="tabpanel">
            {!this.state.weeklyLoader
              ? weeklyPlayers.length > 0
                ? weeklyPlayers
                : <EmptyJordan message="Such empty..." />
              : <Loader show={this.state.weeklyLoader} />}
          </div>
          <div className="pt-4 pb-1 tab-pane fade" id="monthly" role="tabpanel">
            {!this.state.monthlyLoader
              ? monthlyPlayers.length > 0
                ? monthlyPlayers
                : <EmptyJordan message="Such empty..." />
              : <Loader show={this.state.monthlyLoader} />}
          </div>
        </div>
        <PlayerModal
          loader={this.state.modalLoader}
          stats={this.state.stats}
          image={this.state.stats
            ? this.state.playerIMG[`${this.state.stats.nbaID}.png`] || this.state.posIMG[`${this.state.stats.position.toLowerCase()}.png`]
            : ''}
        />
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
            player={player}
            avatar={this.state.playerIMG[`${player.nbaID}.png`] || this.state.posIMG[`${player.position.toLowerCase()}.png`]}
            showModal={this.showModal}
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
