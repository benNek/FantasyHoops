import React, { Component } from 'react';
import { PlayerPool } from './PlayerPool';
import { PlayerCard } from './PlayerCard';
import { ProgressBar } from './ProgressBar';
const budget = 300; // thousands

export class Lineup extends Component {
  constructor() {
    super();
    this.selectPlayer = this.selectPlayer.bind(this);
    this.filter = this.filter.bind(this);

    this.state = {
      position: '',
      pg: <PlayerCard filter={this.filter} status={0} position="PG" />,
      sg: <PlayerCard filter={this.filter} status={0} position="SG" />,
      sf: <PlayerCard filter={this.filter} status={0} position="SF" />,
      pf: <PlayerCard filter={this.filter} status={0} position="PF" />,
      c: <PlayerCard filter={this.filter} status={0} position="C" />
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

  render() {
    const remaining = this.calculateRemaining();
    return (
      <div className="container bg-light" style={{ padding: '0' }}>
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
          <div className="row mt-4 justify-content-center"
            style={{
              fontSize: '25px',
              color: remaining < 0 ? 'red' : 'black'
            }}>
            <div className="col"> Remaining {remaining}K</div>
            <div className="col">
            <a className="btn btn-primary" href="#" role="button">Submit</a>
            </div>
          </div>
          <ProgressBar players={this.state} />
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

}
