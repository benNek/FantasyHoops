import React, { Component } from 'react';
import { PlayerPool } from './PlayerPool';
import { PlayerCard } from './PlayerCard';
import { ProgressBar } from './ProgressBar';

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
            <ProgressBar players={this.state} />
          </div>
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
}
