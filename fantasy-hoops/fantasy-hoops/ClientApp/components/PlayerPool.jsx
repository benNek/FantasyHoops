import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { PlayerCard } from './PlayerCard';
import _ from 'lodash';

export class PlayerPool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.players
    }
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.players == this.props.players) {
      return;
    }
    this.setState({
      players: this.props.players
    });
  }

  render() {
    const players = _.map(
      this.state.players,
      (player) => {
        if (player.position === this.props.position
          || this.props.position === '')
          return <div className="col-3">
            <PlayerCard
              id={player.id}
              key={player.id}
              status={1}
              player={player}
              selectPlayer={this.props.selectPlayer}
              handleSelect={this.handleSelect}
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

  handleSelect(id, position) {
    let players = this.state.players;
    const p = _.map(players,
      p => {
        if (this.props.position == ''
          || p.position === this.props.position) {
          if (p.position === position) {
            if (p.id === id)
              p.selected = p.selected;
            else p.selected = false;
          }
        }
      })
  }
}
