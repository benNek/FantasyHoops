import React, { Component } from 'react';
import { LeaderboardPanel } from './LeaderboardPanel';

export class UserLeaderboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container bg-light pt-5 pb-1">
      <LeaderboardPanel />
      </div>
    );
  }
}