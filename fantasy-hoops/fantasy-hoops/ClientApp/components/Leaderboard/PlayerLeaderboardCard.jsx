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
              <h4>1</h4>
            </div>
            <div className="pl-1">
              <div className="bg-success card-circle position-absolute" style={{ top: '0.45rem' }}>
                <img className="user-card-player" src={require(`../../content/images/players/${203507}.png`)} />
              </div>
            </div>
            <p className="player-name pt-1" style={{ paddingLeft: '5rem' }}>Giannis Antetokounmpo</p>
            <div className="mt-0 position-absolute  " style={{ right: '0rem', width: '8rem' }}>
              <h4 className="text-center">78.5 FP</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}