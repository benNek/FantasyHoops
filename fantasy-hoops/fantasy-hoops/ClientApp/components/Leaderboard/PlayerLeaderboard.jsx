import React, { Component } from 'react';
import { PlayerLeaderboardCard } from './PlayerLeaderboardCard';

export class PlayerLeaderboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div><PlayerLeaderboardCard /> </div>
    );
  }
}
