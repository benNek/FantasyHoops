import React, { Component } from 'react';

export class PlayerLeaderboardCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card bg-white rounded mt-1 mx-auto" style={{ width: '40%', height: '4.5rem' }}>
        <div className="card-body">
          <div className="row">
            <div className="align-middle ml-3">
              <h4>{this.props.index + 1}</h4>
            </div>
            <div className="pl-1">
              <div className="card-circle position-absolute" style={{ top: '0.45rem', backgroundColor: `${this.props.teamColor}` }}>
                <img className="user-card-player" src={this.props.avatar} />
              </div>
            </div>
            <p className="player-name pt-1" style={{ paddingLeft: '5rem' }}>{this.props.firstName} {this.props.lastName}</p>
            <div className="mt-0 position-absolute  " style={{ right: '0rem', width: '8rem' }}>
              <h4 className="text-center">{this.props.fp} FP</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}