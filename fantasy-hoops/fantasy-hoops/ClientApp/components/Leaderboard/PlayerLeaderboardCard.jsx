import React, { Component } from 'react';

export class PlayerLeaderboardCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row ml-1">
        <h6 className="mt-4 ml-1">1</h6>
        <div className="card-group bg-white ml-3 rounded user-score">
          <div className="row m-0 mr-1">
            <div className="bg-secondary card-circle pr-4">
              <img className="user-card-player" src={require(`../../content/images/players/${2544}.png`)} />
            </div>
            <p className="player-usertitle mt-4">Lebron</p>
          </div>
          <div className="card-text mr-7 user-score-total ml-3 mt-3">
            <h5 style={{ marginLeft: "2rem", marginTop: "3" }}>323.7</h5>
            <h6 style={{ marginLeft: "5rem", marginTop: "-28" }}>FP</h6>
          </div>
        </div>
      </div>
    );
  }
}