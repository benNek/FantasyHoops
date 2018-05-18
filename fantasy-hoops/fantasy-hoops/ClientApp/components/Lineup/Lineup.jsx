import React, { Component } from 'react';
import { PlayerPool } from './PlayerPool';
import { PlayerCard } from './PlayerCard';
import { ProgressBar } from './ProgressBar';
import { parse } from '../../utils/auth';
import { handleErrors } from '../../utils/errors';
import { Alert } from '../Alert';
import { PlayerModal } from '../PlayerModal/PlayerModal';
import moment from 'moment';
import Countdown from 'react-countdown-now';
import { InfoModal } from './InfoModal';
import { Loader } from '../Loader';
import { importAll } from '../../utils/reusableFunctions';
import { EmptyJordan } from '../EmptyJordan'
const budget = 300; // thousands

export class Lineup extends Component {
  constructor() {
    super();

    this.selectPlayer = this.selectPlayer.bind(this);
    this.filter = this.filter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);

    this.state = {
      position: '',
      pg: <PlayerCard image={require('../../content/images/positions/pg.png')} filter={this.filter} status={0} position="PG" />,
      sg: <PlayerCard image={require('../../content/images/positions/sg.png')} filter={this.filter} status={0} position="SG" />,
      sf: <PlayerCard image={require('../../content/images/positions/sf.png')} filter={this.filter} status={0} position="SF" />,
      pf: <PlayerCard image={require('../../content/images/positions/pf.png')} filter={this.filter} status={0} position="PF" />,
      c: <PlayerCard image={require('../../content/images/positions/c.png')} filter={this.filter} status={0} position="C" />,
      loadedPlayers: false,
      showAlert: false,
      alertType: '',
      alertText: '',
      posIMG: this.getPosImages(),
      playerIMG: this.getPlayerImages(),
      nextGame: '',
      serverTime: '',
      playerLoader: false,
      submit: true,
      isGame: true,
      modalLoader: true,
      poolLoader: true
    };
  }

  async componentWillMount() {
    this.setState({
      playerLoader: true
    });
    await fetch(`http://localhost:51407/api/lineup/nextGame`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (new Date(res.nextGame).getFullYear() != 1) {
          this.setState({
            nextGame: res.nextGame,
            serverTime: res.serverTime,
            playerPoolDate: res.playerPoolDate,
            poolLoader: false
          });
        }
        else {
          this.setState({
            isGame: false,
            poolLoader: false
          })
        }
      });

    if (!this.state.isGame)
      return;

    await fetch(`http://localhost:51407/api/player`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          players: res,
          playerLoader: false
        });
      });
    this.filter('PG');
  }

  async componentDidUpdate() {
    if (!this.state.isGame)
      return;

    if (!this.state.loadedPlayers && this.state.players) {
      const user = parse();
      await fetch(`http://localhost:51407/api/lineup/${user.id}`)
        .then(res => {
          return res.json()
        })
        .then(res => {
          res.forEach(selectedPlayer => {
            this.state.players.forEach(player => {
              if (player.id == selectedPlayer.id) {
                player.selected = true;
                player.status = 2;
                this.selectPlayer(player);
              }
            });
          })
        });
      this.setState({
        loadedPlayers: true
      })
    }

    if (this.state.pg.props.player && this.state.sg.props.player
      && this.state.sf.props.player && this.state.pf.props.player
      && this.state.c.props.player && this.calculateRemaining() >= 0
      && this.state.playerPoolDate === this.state.nextGame
      && this.state.submit) {
      const btn = document.getElementById('submit');
      btn.disabled = false;
      btn.className = 'btn btn-primary btn-lg btn-block';
    }
    else {
      const btn = document.getElementById('submit');
      btn.disabled = true;
      btn.className = 'btn btn-outline-primary btn-lg btn-block';
    }
  }

  getDate() {
    const nextGame = new Date(this.state.nextGame);
    const serverTime = new Date(this.state.serverTime);
    const diff = Math.abs(serverTime.getTimezoneOffset()) / 60;
    return nextGame.setHours(nextGame.getHours() + diff);
  }

  render() {
    if (this.state.poolLoader)
      return (
        <div className="p-5">
          <Loader show={this.state.poolLoader} />
        </div>
      );

    if (!this.state.isGame)
      return (
        <div className="p-5">
          <EmptyJordan message="The game hasn't started yet..." />
        </div>
      );

    const remaining = this.calculateRemaining();
    const Completionist = () => <span>The game already started. Come back soon!</span>;
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        this.state.submit = false;
        return <Completionist />;
      } else {
        if (this.state.playerPoolDate !== this.state.nextGame)
          return <h5>Please wait a moment until player pool is updated!</h5>;
        this.state.submit = true;
        return <span>Game starts in <strong>{days}:{hours}:{minutes}:{seconds}</strong></span>;
      }
    };
    const playerPool = () => {
      if (this.state.playerPoolDate !== this.state.nextGame && !this.state.playerLoader) {
        return (
          <div className="p-5">
            <EmptyJordan message="Player pool is empty..." />
          </div>
        );
      } else {
        return (
          <PlayerPool
            playerIMG={this.state.playerIMG}
            posIMG={this.state.posIMG}
            position={this.state.position}
            players={this.state.players}
            selectPlayer={this.selectPlayer}
            showModal={this.showModal}
          />
        );
      }
    };

    return (
      <div className="container bg-light pb-5" style={{ width: '100%' }}>
        <div className="bg-light sticky-top" style={{ top: '4rem', width: '100%' }}>
          <div className="pt-3 text-center mx-auto" style={{ width: "50%" }}>
            <Alert type={this.state.alertType} text={this.state.alertText} show={this.state.showAlert} />
          </div>
          <button
            type="button"
            className="btn btn-info absolute btn-circle btn-lg m-3"
            data-toggle="modal" data-target="#infoModal"
            style={{ position: 'absolute', right: '0', fontSize: '1.2rem' }}>
            <i className="fa fa-info mx-auto" aria-hidden="true"></i>
          </button>
          <div style={{ width: '100%' }}>
            <div className="text-center mb-3">
              <Countdown date={this.getDate()} renderer={renderer} />
            </div>
            <div className="mx-auto" style={{ transform: 'scale(0.7, 0.7)', marginTop: '-2rem' }}>
              <div className="row justify-content-center">
                {this.state.pg}
                {this.state.sg}
                {this.state.sf}
                {this.state.pf}
                {this.state.c}
              </div>
            </div>
            <div className="row"
              style={{
                fontSize: '1.2rem',
                color: remaining < 0 ? 'red' : 'black',
                marginTop: '-1rem'
              }}>
              <div className="col text-center">
                <div> Remaining {remaining}K</div>
              </div>
            </div>
            <ProgressBar players={this.state} />
            <div className="text-center mt-3 pb-3 mx-auto" style={{ width: "50%" }}>
              <form onSubmit={this.handleSubmit}>
                <button id='submit' disabled className="btn btn-outline-primary btn-lg btn-block">Submit</button>
              </form>
            </div>
          </div>
          <Loader show={this.state.playerLoader} />
          {playerPool()}
        </div>
        <PlayerModal
          loader={this.state.modalLoader}
          stats={this.state.stats}
          image={this.state.stats
            ? this.state.playerIMG[`${this.state.stats.nbaID}.png`] || this.state.posIMG[`${this.state.stats.position.toLowerCase()}.png`]
            : ''}
        />
        <InfoModal />
      </div>
    );
  }

  filter(pos) {
    this.setState({
      position: pos
    });
  }

  selectPlayer(player) {
    const pos = player.position.toLowerCase();
    const playerCard = player.selected
      ? <PlayerCard
        status={2}
        filter={this.filter}
        player={player}
        image={this.state.playerIMG[`${player.id}.png`] || this.state.posIMG[`${pos}.png`]}
        selectPlayer={this.selectPlayer}
        position={player.position}
        showModal={this.showModal}
      />
      : <PlayerCard
        status={0}
        filter={this.filter}
        position={player.position}
        image={this.state.posIMG[`${pos}.png`]}
      />;
    this.setState({
      [pos]: playerCard
    });
  }

  async showModal(player) {
    await fetch(`http://localhost:51407/api/stats/${player.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          stats: res,
          modalLoader: false
        });
      });
  }

  calculateRemaining() {
    const remaining = budget
      - this.price(this.state.pg)
      - this.price(this.state.sg)
      - this.price(this.state.sf)
      - this.price(this.state.pf)
      - this.price(this.state.c);
    return remaining;
  }

  price(player) {
    const playerPrice = (player.props.status == 2
      ? parseInt(player.props.player.price)
      : 0)
    return playerPrice;
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = parse();
    const data = {
      UserID: user.id,
      PgID: this.state.pg.props.player.playerId,
      SgID: this.state.sg.props.player.playerId,
      SfID: this.state.sf.props.player.playerId,
      PfID: this.state.pf.props.player.playerId,
      CID: this.state.c.props.player.playerId,
      PgPrice: this.state.pg.props.player.price,
      SgPrice: this.state.sg.props.player.price,
      SfPrice: this.state.sf.props.player.price,
      PfPrice: this.state.pf.props.player.price,
      CPrice: this.state.c.props.player.price
    };

    fetch('/api/lineup/submit', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => handleErrors(res))
      .then(res => res.text())
      .then(res => {
        this.setState({
          showAlert: true,
          alertType: 'alert-success',
          alertText: res
        });
      })
      .catch(err => {
        this.setState({
          showAlert: true,
          alertType: 'alert-danger',
          alertText: err.message
        });
      });
  }

  getPosImages() {
    try {
      return importAll(require.context('../../content/images/positions', false, /\.(png|jpe?g|svg)$/))
    }
    catch (err) {
      return ''
    }
  }

  getPlayerImages() {
    try {
      return importAll(require.context('../../content/images/players', false, /\.(png|jpe?g|svg)$/))
    }
    catch (err) {
      return ''
    }
  }
}
