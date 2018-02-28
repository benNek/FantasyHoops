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
            player => (
                <div className="col 3">
                    <PlayerCard id={player.id} key={player.id} player={player} selectPlayer={this.props.selectPlayer}/>
                </div>
            )
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
  