import React, { Component } from 'react';
import { UserLeaderboardCard as Card } from './UserLeaderboardCard';
import leaderboardLogo from '../../content/images/leaderboard.png';
import shortid from 'shortid';
import _ from 'lodash';
import defaultPhoto from '../../content/images/default.png';
import { importAll } from '../../utils/reusableFunctions';
import { Loader } from '../Loader';
import { EmptyJordan } from '../EmptyJordan';

export class UserLeaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyUsers: '',
      weeklyUsers: '',
      monthlyUsers: '',
      userIMG: this.getUserImages(),
      dailyLoader: true,
      weeklyLoader: true,
      monthlyLoader: true
    }
  }

  async componentWillMount() {
    await fetch(`http://localhost:51407/api/leaderboard/user?type=daily`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          dailyUsers: res,
          dailyLoader: false
        });
      })
    await fetch(`http://localhost:51407/api/leaderboard/user?type=weekly`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          weeklyUsers: res,
          weeklyLoader: false
        });
      })
    await fetch(`http://localhost:51407/api/leaderboard/user?type=monthly`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          monthlyUsers: res,
          monthlyLoader: false
        });
      })
  }

  render() {
    const dailyUsers = this.createUsers(this.state.dailyUsers)
    const weeklyUsers = this.createUsers(this.state.weeklyUsers)
    const monthlyUsers = this.createUsers(this.state.monthlyUsers)
    return (
      <div className="container bg-light pt-2 pb-3">
        <div className="text-center pb-3">
          <img src={leaderboardLogo}
            alt=""
            width="60rem"
          />
          <h3>Top Users</h3>
        </div>
        <ul className="nav nav-tabs justify-content-center mx-auto" id="myTab" role="tablist" style={{ width: '30%' }}>
          <li className="nav-item">
            <a className="nav-link active" id="daily-tab" data-toggle="tab" href="#daily" role="tab">Daily</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="weekly-tab" data-toggle="tab" href="#weekly" role="tab">Weekly</a>
          </li><li className="nav-item">
            <a className="nav-link" id="monthly-tab" data-toggle="tab" href="#monthly" role="tab">Monthly</a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="pt-4 pb-1 tab-pane fade show active" id="daily" role="tabpanel">
            {!this.state.dailyLoader
              ? dailyUsers.length > 0
                ? dailyUsers
                : <EmptyJordan message="Such empty..." />
              : <Loader show={this.state.dailyLoader} />}
          </div>
          <div className="pt-4 pb-1 tab-pane fade" id="weekly" role="tabpanel">
            {!this.state.weeklyLoader
              ? weeklyUsers.length > 0
                ? weeklyUsers
                : <EmptyJordan message="Such empty..." />
              : <Loader show={this.state.weeklyLoader} />}
          </div>
          <div className="pt-4 pb-1 tab-pane fade" id="monthly" role="tabpanel">
            {!this.state.monthlyLoader
              ? monthlyUsers.length > 0
                ? monthlyUsers
                : <EmptyJordan message="Such empty..." />
              : <Loader show={this.state.monthlyLoader} />}
          </div>
        </div>
      </div>
    );
  }

  getUserImages() {
    try {
      return importAll(require.context('../../content/images/avatars', false, /\.(png|jpe?g|svg)$/))
    }
    catch (err) {
      return ''
    }
  }

  createUsers(users) {
    return _.map(
      users,
      (user, index) => {
        {
          return <Card
            index={index}
            key={shortid()}
            avatar={this.state.userIMG[`${user.id}.png`] || defaultPhoto}
            userName={user.userName}
            fp={user.score}
          />
        }
      }
    );
  }
}