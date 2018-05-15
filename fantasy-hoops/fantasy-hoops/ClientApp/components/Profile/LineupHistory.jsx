import React, { Component } from 'react';
import { Loader } from '../Loader';
import icon from '../../content/basketball-player-scoring.svg';

export class LineupHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: true
    }
  }

  render() {
    return (
      <div className="container bg-light p-4">
        <h3 className="text-center"><span><img src={icon} width="65rem" /></span> User lineup history</h3>
        <div className="m-3">
        </div>
        <div className="text-center">
        </div>
        <Loader show={this.state.loader} />
      </div>
    );
  }
}
