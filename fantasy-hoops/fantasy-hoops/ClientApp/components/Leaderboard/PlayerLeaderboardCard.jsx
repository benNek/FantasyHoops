import React, { Component } from 'react';

export class PlayerLeaderboardCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card bg-white rounded mt-1 mx-auto" style={{ width: '40%', height: '4.5rem' }}>
        <div className="card-body">
          <div className="d-inline-block align-middle mr-1">
            <h4>1</h4>
          </div>
          <div className="d-inline-block align-middle mr-1">
            <div className="bg-success card-circle position-absolute" style={{top: '0rem'}}>
              <img className="user-card-player" src={require(`../../content/images/players/${203507}.png`)} />
            </div>
          </div>
          <div className="d-inline-block">
            <p className="align-middle player-name" style={{ paddingLeft: '5rem' }}>Giannis Antetokounmpo</p>
          </div>
          <div className="d-inline-block float-right" style={{ paddingTop: '0.3rem' }}>
            <h5>72.8 FP</h5>
          </div>
        </div>
      </div>
    );
  }
}