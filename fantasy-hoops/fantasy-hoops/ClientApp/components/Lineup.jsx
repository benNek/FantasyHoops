import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { PlayerPool } from './PlayerPool';
import { PlayerCard } from './PlayerCard';
import PlayerAPI from '../mocked/players';

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

  render() {
    let players = PlayerAPI.all();
    return (
      <div className="container mt-4">
        <div className="row">
          {this.state.pg}
          {this.state.sg}
          {this.state.sf}
          {this.state.pf}
          {this.state.c}
        </div>
        <div className="row">
          <PlayerPool position={this.state.position} players={players} selectPlayer={this.selectPlayer} filter={this.filter} />
        </div>
      </div>
    );
  }

  filter(pos) {
    this.setState({
      position: pos
    });
  }

  selectPlayer(player, status) {
    const playerCard = player.selected
      ? <PlayerCard status={2} filter={this.filter} player={player} selectPlayer={this.selectPlayer} position={player.position} />
      : <PlayerCard status={0} filter={this.filter} position={player.position} />;
    const pos = player.position.toLowerCase();
    this.setState({
      [pos]: playerCard
    });
  }
}
