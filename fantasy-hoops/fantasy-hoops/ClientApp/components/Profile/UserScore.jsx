import React, { Component } from 'react';
import { UserScoreCard } from './UserScoreCard';
import shortid from 'shortid';

export class UserScore extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let players = '';
    if (this.props.activity != null) {
      players = _.map(
        this.props.activity.players,
        (player) => {
          return (
            <UserScoreCard key={shortid()} player={player} />
          )
        });
    }

    return (
      <div className="card bg-white rounded mt-2 user-score">
        <div className="card-body">
          <div className="row">
          {players}
        </div>
        <div className="card-text user-score-total text-center">
          <h4>{this.props.activity.score}</h4>
          <h6 style={{ marginTop: "-0.7rem" }}>PTS</h6>
          <h6 style={{ fontSize: "0.8rem", marginTop: "1.6rem", fontWeight: 400 }}>{this.props.activity.date.substring(0, 10)}</h6>
        </div>
      </div>
    );
  }
}