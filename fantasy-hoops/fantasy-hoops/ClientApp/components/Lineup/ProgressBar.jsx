import React, { Component } from 'react';
import { Bar } from './Bar';
const budget = 300; // thousands

export class ProgressBar extends Component {
  render() {
    const remaining = this.calculateRemaining();
    return (
      <div style={{height: '100px'}}>
        <div className="row mt-4 justify-content-center"
          style={{
            fontSize: '25px',
            color: remaining < 0 ? 'red' : 'black'
          }}>Remaining {remaining}K</div>
        <div className="row mt-4 justify-content-center">
          <div className="progress" style={{ width: '91%' }}>
            <Bar player={this.props.players.pg} />
            <Bar player={this.props.players.sg} />
            <Bar player={this.props.players.sf} />
            <Bar player={this.props.players.pf} />
            <Bar player={this.props.players.c} />
          </div>
        </div>
      </div>
    );
  }

  calculateRemaining() {
    const players = this.props.players;
    const remaining = budget
      - this.price(players.pg)
      - this.price(players.sg)
      - this.price(players.sf)
      - this.price(players.pf)
      - this.price(players.c);
    return remaining;
  }

  price(player) {
    const playerPrice = (player.props.status == 2
      ? parseInt(player.props.player.price)
      : 0)
    return playerPrice;
  }
}
