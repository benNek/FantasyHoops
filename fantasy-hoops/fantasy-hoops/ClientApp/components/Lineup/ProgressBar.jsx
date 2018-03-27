import React, { Component } from 'react';
import { Bar } from './Bar';

export class ProgressBar extends Component {
  render() {
    return (
      <div className="row mt-2 justify-content-center">
        <div className="progress bar" style={{ width: '90%' }}>
          <Bar player={this.props.players.pg} />
          <Bar player={this.props.players.sg} />
          <Bar player={this.props.players.sf} />
          <Bar player={this.props.players.pf} />
          <Bar player={this.props.players.c} />
        </div>
      </div>
    );
  }
}
