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
            <div className="pl-5 pt-3">
              <h4>{this.props.activity.score}</h4>
              <h6 className="text-center pr-2" style={{ marginTop: "-0.7rem" }}>PTS</h6>
              <h6 style={{ fontSize: "0.8rem", marginTop: "0.5rem", fontWeight: 400 }}>{this.props.activity.date.substring(0, 10)}</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}