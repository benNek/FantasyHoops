import React, { Component } from 'react';

export class UserScoreCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <div className="card-circle" style={{ backgroundColor: this.props.player.color }}>
          <img className="user-card-player" src={require(`../../content/images/players/${this.props.player.nbaID}.png`)} />
        </div>
        <p className="player-usertitle">{this.props.player.lastName}</p>
        <p className="player-score">{this.props.player.fp}</p>
      </div>
    );
  }
}