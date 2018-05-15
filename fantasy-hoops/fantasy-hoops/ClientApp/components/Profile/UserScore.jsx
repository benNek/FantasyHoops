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
            <UserScoreCard
              key={shortid()}
              image={this.props.playerIMG[`${player.nbaID}.png`]
                || this.props.posIMG[`${player.position.toLowerCase()}.png`]}
              player={player}
              showModal={this.props.showModal}
            />
          )
        });
    }

    return (
      <div className="card bg-white rounded mt-2 mx-auto" style={{ width: '35rem' }}>
        <div className="card-body" style={{ height: '6.8rem' }}>
          <div className="row" style={{ marginTop: '-0.5rem' }}>
            {players}
            <div className="mt-0" style={{ width: '8rem' }}>
              <h4 className="text-center pt-2">{this.props.activity.score}</h4>
              <h6 className="text-center" style={{ marginTop: "-0.7rem" }}>PTS</h6>
              <h6 className="text-center pt-1" style={{ fontSize: "0.8rem", marginTop: "0.5rem", fontWeight: 400 }}>{this.props.activity.date.substring(0, 10)}</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}