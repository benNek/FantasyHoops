import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { PlayerCard } from './PlayerCard';
import _ from 'lodash';

export class PlayerPool extends Component {
  constructor() {
    super();
  }

  render() {
    const players = _.map(
      this.props.players,
      (player) => {
        if (player.position === this.props.position)
          return <div className="col-3">
            <PlayerCard
              id={player.id}
              key={player.id}
              status={1}
              player={player}
              selectPlayer={this.props.selectPlayer}
              filter={this.props.filter}
            />
          </div>
      }
    );
    return (
      <div className="container mt-4">
        <div className="row">
          {players}
        </div>
      </div>
    );
  }
}
