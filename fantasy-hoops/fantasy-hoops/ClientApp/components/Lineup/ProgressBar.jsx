import React, { Component } from 'react';
import { Bar } from './Bar';
const budget = 300; // thousands

export class ProgressBar extends Component {
  constructor() {
    super();

    this.state = {
      updated: false,
      remaining: budget
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.updated) {
      this.calculateRemaining();
    }
  }

  render() {
    return (
      <div>
        <div className="row mt-4 justify-content-center"
          style={{
            fontSize: '25px',
            color: this.state.remaining < 0 ? 'red' : 'black'
          }}>Remaining {this.state.remaining}K</div>
        <div className="row mt-4 justify-content-center">
          <div className="progress" style={{ width: '66%' }}>
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
    this.setState({
      updated: !this.state.updated,
      remaining: budget
        - this.price(players.pg)
        - this.price(players.sg)
        - this.price(players.sf)
        - this.price(players.pf)
        - this.price(players.c)
    });
  }

  price(player) {
    const playerPrice = (player.props.status == 2
      ? parseInt(player.props.player.price.replace('K', ''))
      : 0)
    return playerPrice;
  }
}
