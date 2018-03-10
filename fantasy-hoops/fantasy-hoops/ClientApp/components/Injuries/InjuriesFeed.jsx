import React, { Component } from 'react';
import { InjuryCard } from './InjuryCard';
import InjuriesAPI from '../../mocked/Injuries';
import _ from 'lodash'

export class InjuriesFeed extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const players = _.map(InjuriesAPI.all(),
      (player) => {
        return <InjuryCard player={player} />
      }
    );
    return (
      <div className="container mt-4 bg-light" style={{ paddingTop: '5em' }}>
        <div className="row">
          {players}
        </div>
      </div>
    );
  }
}
