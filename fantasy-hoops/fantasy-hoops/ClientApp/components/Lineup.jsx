import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { PlayerCard } from './PlayerCard';

export class Lineup extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="row">
        <div className="pg">
          <PlayerCard isUnknown="true" position="PG"/>
        </div>
        <div className="pg">
          <PlayerCard isUnknown="true" position="SG"/>
        </div>
        <div className="pg">
          <PlayerCard isUnknown="true" position="SF"/>
        </div>
        <div className="pg">
          <PlayerCard isUnknown="true" position="PF"/>
        </div>
        <div className="pg">
          <PlayerCard isUnknown="true" position="C"/>
        </div>
      </div>
    );
  }
}
