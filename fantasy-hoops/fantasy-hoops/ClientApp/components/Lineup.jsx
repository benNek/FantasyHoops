import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { PlayerPool } from './PlayerPool';
import { PlayerCard } from './PlayerCard';
import PlayerAPI from '../mocked/players';
const budget = 300; // thousands

export class Lineup extends Component {
  constructor() {
    super();
    this.selectPlayer = this.selectPlayer.bind(this);
    this.filter = this.filter.bind(this);

    this.state = {
      updated: false,
      position: '',
      pg: <PlayerCard filter={this.filter} status={0} position="PG" />,
      sg: <PlayerCard filter={this.filter} status={0} position="SG" />,
      sf: <PlayerCard filter={this.filter} status={0} position="SF" />,
      pf: <PlayerCard filter={this.filter} status={0} position="PF" />,
      c: <PlayerCard filter={this.filter} status={0} position="C" />,
      colors: {
        pg: '',
        sg: '',
        sf: '',
        pf: '',
        c: ''
      },
      barWidth: {
        pg: '',
        sg: '',
        sf: '',
        pf: '',
        c: ''
      }
    };
  }

  componentDidUpdate(){
    if(!this.state.updated)
    this.updateProgressBar();
  }

  render() {
    let players = PlayerAPI.all();
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          {this.state.pg}
          {this.state.sg}
          {this.state.sf}
          {this.state.pf}
          {this.state.c}
        </div>
        <div className="row mt-4 justify-content-center">
          <div className="progress" style={{ width: '66%' }}>
            <div className="progress-bar" role="progressbar"
              style={{
                backgroundColor: this.state.colors.pg,
                width: `${this.state.barWidth.pg}%`
              }}>
            </div>
            <div className="progress-bar" role="progressbar"
              style={{
                backgroundColor: this.state.colors.sg,
                width: `${this.state.barWidth.sg}%`
              }}>
            </div>
            <div className="progress-bar" role="progressbar"
              style={{
                backgroundColor: this.state.colors.sf,
                width: `${this.state.barWidth.sf}%`
              }}>
            </div>
            <div className="progress-bar" role="progressbar"
              style={{
                backgroundColor: this.state.colors.pf,
                width: `${this.state.barWidth.pf}%`
              }}>
            </div>
            <div className="progress-bar" role="progressbar"
              style={{
                backgroundColor: this.state.colors.c,
                width: `${this.state.barWidth.c}%`
              }}>
            </div>
          </div>
        </div>
        <div className="center row justify-content-center" style={{ width: '90%' }}>
          <PlayerPool
            position={this.state.position}
            players={players}
            selectPlayer={this.selectPlayer}
          />
        </div>
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
      [pos]: playerCard,
      updated: false
    });
  }

  updateProgressBar() {
    this.setState({
      updated: true,
      colors: {
        pg: this.state.pg.props.status == 2 ? this.state.pg.props.player.teamColor : this.state.colors.pg,
        sg: this.state.sg.props.status == 2 ? this.state.sg.props.player.teamColor : this.state.colors.sg,
        sf: this.state.sf.props.status == 2 ? this.state.sf.props.player.teamColor : this.state.colors.sf,
        pf: this.state.pf.props.status == 2 ? this.state.pf.props.player.teamColor : this.state.colors.pf,
        c: this.state.c.props.status == 2 ? this.state.c.props.player.teamColor : this.state.colors.c
      },
      barWidth: {
        pg: (this.state.pg.props.status == 2 ? parseInt(this.state.pg.props.player.price.replace('K', '')) : 0) / budget * 100,
        sg: (this.state.sg.props.status == 2 ? parseInt(this.state.sg.props.player.price.replace('K', '')) : 0) / budget * 100,
        sf: (this.state.sf.props.status == 2 ? parseInt(this.state.sf.props.player.price.replace('K', '')) : 0) / budget * 100,
        pf: (this.state.pf.props.status == 2 ? parseInt(this.state.pf.props.player.price.replace('K', '')) : 0) / budget * 100,
        c: (this.state.c.props.status == 2 ? parseInt(this.state.c.props.player.price.replace('K', '')) : 0) / budget * 100
      }
    });
  }
}
