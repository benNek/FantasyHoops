import React, { Component } from 'react';
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
    if (this.state.players == this.props.players) {
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
          || this.props.position === '') {
          const pos = this.props.position.toLowerCase();
          return <div className="ml-3 mt-3">
            <PlayerCard
              key={player.id}
              id={player.id}
              status={1}
              player={player}
              image={this.getPlayerImage()}
              selectPlayer={this.props.selectPlayer}
              handleSelect={this.handleSelect}
              showModal={this.props.showModal}
            />
          </div>
        }
      }
    );
    return (
      <div className="container">
        <div className="row justify-content-center" style={{ margin: 'auto' }}>
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

  getPlayerImage() {
    const n = "1357924680";
    return `http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${n[0]}${n[9]}${n[5]}${n[0]}.png&w=350&h=254`
  }
}
