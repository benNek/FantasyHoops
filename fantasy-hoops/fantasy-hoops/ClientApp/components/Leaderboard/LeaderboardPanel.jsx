import React, { Component } from 'react';
import { UserLeaderboardCard } from './UserLeaderboardCard';

export class LeaderboardPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" id="daily-tab" data-toggle="tab" href="#daily" role="tab">Daily</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="weekly-tab" data-toggle="tab" href="#weekly" role="tab">Weekly</a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="pt-4 pb-1 tab-pane fade show active" id="daily" role="tabpanel">
            <UserLeaderboardCard />
            <UserLeaderboardCard />
            <UserLeaderboardCard />
            <UserLeaderboardCard />
            <UserLeaderboardCard />
          </div>
          <div className="pt-4 pb-1 tab-pane fade" id="weekly" role="tabpanel">
            <UserLeaderboardCard />
            <UserLeaderboardCard />
            <UserLeaderboardCard />
            <UserLeaderboardCard />
            <UserLeaderboardCard />
          </div>
        </div>
      </div>
    );
  }
}