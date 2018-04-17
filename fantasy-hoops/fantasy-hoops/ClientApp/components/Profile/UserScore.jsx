import React, { Component } from 'react';

export class UserScore extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card-group bg-white rounded mt-3 user-score">
        <div className="row m-0 ml-1">
          <div style={{ overflow: 'hidden' }}>
            <div className="bg-warning card-circle">
              <img className="user-card-player" src={require(`../../content/images/players/${1628366}.png`)} />
            </div>
            <p className="player-usertitle">Ball</p>
            <p className="player-score">69.0</p>
          </div>
          <div>
            <div className="bg-success card-circle">
              <img className="user-card-player" src={require(`../../content/images/players/${203935}.png`)} />
            </div>
            <p className="player-usertitle">Smart</p>
            <p className="player-score">42.7</p>
          </div>
          <div>
            <div className="bg-secondary card-circle">
              <img className="user-card-player" src={require(`../../content/images/players/${2544}.png`)} />
            </div>
            <p className="player-usertitle">James</p>
            <p className="player-score">78.1</p>
          </div>
          <div>
            <div className="bg-success card-circle">
              <img className="user-card-player" src={require(`../../content/images/players/${203507}.png`)} />
            </div>
            <p className="player-usertitle">Antetokounmpo</p>
            <p className="player-score">79.3</p>
          </div>
          <div>
            <div className="bg-danger card-circle">
              <img className="user-card-player" src={require(`../../content/images/players/${202685}.png`)} />
            </div>
            <p className="player-usertitle">Valanciunas</p>
            <p className="player-score">54.6</p>
          </div>
        </div>
        <div className="card-text user-score-total text-center">
          <h3>323.7</h3>
          <h6 style={{marginTop: "-0.5rem"}}>PTS</h6>
        </div>
      </div>
    );
  }
}