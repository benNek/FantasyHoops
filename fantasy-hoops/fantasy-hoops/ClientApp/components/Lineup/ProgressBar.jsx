import React, { Component } from 'react';
import { Bar } from './Bar';

export class ProgressBar extends Component {
  render() {
    return (
      <div style={{ height: '1.5rem', paddingBottom: '3rem' }}>
        <div className="row mt-4 justify-content-center"
          style={{
            fontSize: '1.5rem',
            color: remaining < 0 ? 'red' : 'black'
          }}>Remaining {remaining}K</div>
        <div className="row mt-4 justify-content-center">
          <div className="progress bar" style={{ width: '90%' }}>
            <Bar player={this.props.players.pg} />
            <Bar player={this.props.players.sg} />
            <Bar player={this.props.players.sf} />
            <Bar player={this.props.players.pf} />
            <Bar player={this.props.players.c} />
          </div>
        </div>
      </div>
    );
  }
}
