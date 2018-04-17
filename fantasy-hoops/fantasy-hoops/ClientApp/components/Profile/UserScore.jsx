import React, { Component } from 'react';

export class UserScore extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card-group">
        <div>
          <div className="rounded-circle bg-primary">
            <img className="player crop" style={{ zIndex: '5' }} src={require(`../../content/images/players/${2544}.png`)} />
          </div>
          <div className="card-body">
            <p className="player-usertitle">Murray</p>
            <p className="player-score">12.9</p>
          </div>
        </div>
        <div>
          <div className="rounded-circle bg-primary">
            <img className="player crop" style={{ zIndex: '5' }} src={require(`../../content/images/players/${2544}.png`)} />
          </div>
          <div className="card-body">
            <p className="player-usertitle">Murray</p>
            <p className="player-score">12.9</p>
          </div>
        </div>
        <div>
          <div className="rounded-circle bg-primary">
            <img className="player crop" style={{ zIndex: '5' }} src={require(`../../content/images/players/${2544}.png`)} />
          </div>
          <div className="card-body">
            <p className="player-usertitle">Murray</p>
            <p className="player-score">12.9</p>
          </div>
        </div>
        <div>
          <div className="rounded-circle bg-primary">
            <img className="player crop" style={{ zIndex: '5' }} src={require(`../../content/images/players/${2544}.png`)} />
          </div>
          <div className="card-body">
            <p className="player-usertitle">Murray</p>
            <p className="player-score">12.9</p>
          </div>
        </div>
        <div>
          <div className="rounded-circle bg-primary">
            <img className="player crop" style={{ zIndex: '5' }} src={require(`../../content/images/players/${2544}.png`)} />
          </div>
          <div className="card-body">
            <p className="player-usertitle">Murray</p>
            <p className="player-score">12.9</p>
          </div>
        </div>
        <div>
          <div className="card-text">
            <h3>185.4</h3>
          </div>
        </div>
        <p className="card-text">PTS</p>
      </div>
    );
  }
}