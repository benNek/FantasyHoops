import React, { Component } from 'react';
import { PlayerPool } from './PlayerPool';
import { PlayerCard } from './PlayerCard';
import { ProgressBar } from './ProgressBar';
import { parse } from '../../utils/auth';
import { handleErrors } from '../../utils/errors';
import { Alert } from '../Alert';

const budget = 300; // thousands

export class Lineup extends Component {
  constructor() {
    super();
    this.selectPlayer = this.selectPlayer.bind(this);
    this.filter = this.filter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      position: '',
      pg: <PlayerCard filter={this.filter} status={0} position="PG" />,
      sg: <PlayerCard filter={this.filter} status={0} position="SG" />,
      sf: <PlayerCard filter={this.filter} status={0} position="SF" />,
      pf: <PlayerCard filter={this.filter} status={0} position="PF" />,
      c: <PlayerCard filter={this.filter} status={0} position="C" />,
      loadedPlayers: false,
      showAlert: false,
      alertType: '',
      alertText: ''
    };
  }

  componentDidMount() {
    fetch(`http://localhost:51407/api/player`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          players: res
        });
      });
    this.filter('PG');
  }

  componentDidUpdate() {
    if (!this.state.loadedPlayers && this.state.players) {
      const user = parse();
      fetch(`http://localhost:51407/api/lineup/${user.id}`)
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
      && this.state.c.props.player && this.calculateRemaining() >= 0) {
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

  render() {
    const remaining = this.calculateRemaining();
    return (
      <div className="container bg-light" style={{ padding: '0' }}>
        <Alert type={this.state.alertType} text={this.state.alertText} show={this.state.showAlert} />
        <div className="bg-light sticky-top" style={{ top: '4rem' }}>
          <div className="" style={{ transform: 'scale(0.7, 0.7)' }}>
            <div className="row justify-content-center">
              {this.state.pg}
              {this.state.sg}
              {this.state.sf}
              {this.state.pf}
              {this.state.c}
            </div>
          </div>
          <div className="row mt-4"
            style={{
              fontSize: '25px',
              color: remaining < 0 ? 'red' : 'black'
            }}>
            <div className="col text-center">
              <div> Remaining {remaining}K</div>
            </div>
          </div>
          <ProgressBar players={this.state} />
          <div className="col text-center">
            <form onSubmit={this.handleSubmit}>
              <button id='submit' disabled className="btn btn-outline-primary btn-lg btn-block">Submit</button>
            </form>
          </div>
        </div>
        <PlayerPool
          position={this.state.position}
          players={this.state.players}
          selectPlayer={this.selectPlayer}
        />
      </div>
    );
  }

  filter(pos) {
    this.setState({
      position: pos
    });
  }

  selectPlayer(player) {
    const playerCard = player.selected
      ? <PlayerCard status={2} filter={this.filter} player={player} selectPlayer={this.selectPlayer} position={player.position} />
      : <PlayerCard status={0} filter={this.filter} position={player.position} />;
    const pos = player.position.toLowerCase();
    this.setState({
      [pos]: playerCard
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
      CID: this.state.c.props.player.playerId
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
}
