import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { PlayerPool } from './PlayerPool';
import { PlayerCard } from './PlayerCard';
import PlayerAPI from '../mocked/players';

export class Lineup extends Component {
  constructor() {
    super();
    this.selectPlayer = this.selectPlayer.bind(this);

    this.state = {
      position: 'PG',
      pg: <PlayerCard isUnknown="true" position="PG" />,
      sg: <PlayerCard isUnknown="true" position="SG" />,
      sf: <PlayerCard isUnknown="true" position="SF" />,
      pf: <PlayerCard isUnknown="true" position="PF" />,
      c: <PlayerCard isUnknown="true" position="C" />
    };
  }

  render() {
    let players = PlayerAPI.all();
    return (
      <div className="container mt-4">
        <div className="row">
          <a href="#" className="no-color">
            {this.state.pg}
          </a>
          <a href="#" className="no-color">
            {this.state.sg}
          </a>
          <a href="#" className="no-color">
            {this.state.sf}
          </a>
          <a href="#" className="no-color">
            {this.state.pf}
          </a>
          <a href="#" className="no-color">
            {this.state.c}
          </a>
        </div>
        <div className="row">
          <PlayerPool position={this.state.position} players={players} selectPlayer={this.selectPlayer} />
        </div>
      </div>
    );
  }

  selectPlayer(player) {
    const pos = player.position.toLowerCase();
    this.setState({
      [pos]: <PlayerCard player={player} />
    });
  }
}
