import React, { Component } from 'react';
import { parse } from '../../utils/auth';
import { UserLeaderboardCard as Card } from './UserLeaderboardCard';
import leaderboardLogo from '../../content/images/leaderboard.png';
import shortid from 'shortid';
import _ from 'lodash';
import defaultPhoto from '../../content/images/default.png';
import { importAll } from '../../utils/reusableFunctions';
import { Loader } from '../Loader';
import { EmptyJordan } from '../EmptyJordan';
const user = parse();
const LOAD_COUNT = 2;

export class UserLeaderboard extends Component {
  constructor(props) {
    super(props);
    this.toggleFriendsOnly = this.toggleFriendsOnly.bind(this);
    this.loadDaily = this.loadDaily.bind(this);
    this.loadWeekly = this.loadWeekly.bind(this);
    this.loadMonthly = this.loadMonthly.bind(this);

    this.state = {
      dailyUsers: [],
      weeklyUsers: [],
      monthlyUsers: [],
      friendsDailyUsers: [],
      friendsWeeklyUsers: [],
      friendsMonthlyUsers: [],
      userIMG: this.getUserImages(),
      dailyLoader: true,
      weeklyLoader: true,
      monthlyLoader: true,
      friendsOnly: true,
      loader: false,
      dailyLoadCounter: 0,
      weeklyLoadCounter: 0,
      monthlyLoadCounter: 0,
      friendsDailyLoadCounter: 0,
      friendsWeeklyLoadCounter: 0,
      friendsMonthlyLoadCounter: 0
    }
  }

  async componentWillMount() {
    await fetch(`http://localhost:51407/api/leaderboard/user?type=daily`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          dailyUsers: res
        });
      })
    await fetch(`http://localhost:51407/api/leaderboard/user?type=weekly`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          weeklyUsers: res
        });
      })
    await fetch(`http://localhost:51407/api/leaderboard/user?type=monthly`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          monthlyUsers: res
        });
      })

    await fetch(`http://localhost:51407/api/leaderboard/user/${user.id}?type=daily`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          friendsDailyUsers: res,
          dailyLoader: false
        });
      })
    await fetch(`http://localhost:51407/api/leaderboard/user/${user.id}?type=weekly`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          friendsWeeklyUsers: res,
          weeklyLoader: false
        });
      })
    await fetch(`http://localhost:51407/api/leaderboard/user/${user.id}?type=monthly`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          friendsMonthlyUsers: res,
          monthlyLoader: false
        });
      })
  }

  toggleFriendsOnly() {
    this.setState({ friendsOnly: !this.state.friendsOnly });
  }

  async loadDaily() {
    this.setState({
      loader: true
    });
    const link = this.state.friendsOnly
      ? `http://localhost:51407/api/leaderboard/user/${user.id}?type=daily&from=${this.state.friendsDailyUsers.length}&limit=${LOAD_COUNT}`
      : `http://localhost:51407/api/leaderboard/user?type=daily&from=${this.state.dailyUsers.length}&limit=${LOAD_COUNT}`;
    await fetch(link)
      .then(res => {
        return res.json()
      })
      .then(res => {
        console.log(res);
        if (this.state.friendsOnly) {
          this.setState({
            friendsDailyLoadCounter: this.state.friendsDailyLoadCounter + 1,
            friendsDailyUsers: this.state.friendsDailyUsers.concat(res),
            loader: false
          });
        }
        else {
          this.setState({
            dailyLoadCounter: this.state.dailyLoadCounter + 1,
            dailyUsers: this.state.dailyUsers.concat(res),
            loader: false
          });
        }
      });
  }

  async loadWeekly() {
    this.setState({
      loader: true
    });
    const link = this.state.friendsOnly
      ? `http://localhost:51407/api/leaderboard/user/${user.id}?type=weekly&from=${this.state.friendsWeeklyUsers.length}&limit=${LOAD_COUNT}`
      : `http://localhost:51407/api/leaderboard/user?type=weekly&from=${this.state.weeklyUsers.length}&limit=${LOAD_COUNT}`;
    await fetch(link)
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (this.state.friendsOnly) {
          this.setState({
            friendsWeeklyLoadCounter: this.state.friendsWeeklyLoadCounter + 1,
            friendsWeeklyUsers: this.state.friendsWeeklyUsers.concat(res),
            loader: false
          });
        }
        else {
          this.setState({
            weeklyLoadCounter: this.state.weeklyLoadCounter + 1,
            weeklyUsers: this.state.weeklyUsers.concat(res),
            loader: false
          });
        }
      });
  }

  async loadMonthly() {
    this.setState({
      loader: true
    });
    const link = this.state.friendsOnly
      ? `http://localhost:51407/api/leaderboard/user/${user.id}?type=monthly&from=${this.state.friendsMonthlyUsers.length}&limit=${LOAD_COUNT}`
      : `http://localhost:51407/api/leaderboard/user?type=monthly&from=${this.state.monthlyUsers.length}&limit=${LOAD_COUNT}`;
    await fetch(link)
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (this.state.friendsOnly) {
          this.setState({
            friendsMonthlyLoadCounter: this.state.friendsMonthlyLoadCounter + 1,
            friendsMonthlyUsers: this.state.friendsMonthlyUsers.concat(res),
            loader: false
          });
        }
        else {
          this.setState({
            monthlyLoadCounter: this.state.monthlyLoadCounter + 1,
            monthlyUsers: this.state.monthlyUsers.concat(res),
            loader: false
          });
        }
      });
  }

  render() {
    let dailyBtn = '';
    let weeklyBtn = '';
    let monthlyBtn = ';'
    let dailyUsers = [];
    let weeklyUsers = [];
    let monthlyUsers = [];
    if (this.state.friendsOnly) {
      dailyUsers = this.createUsers(this.state.friendsDailyUsers)
      weeklyUsers = this.createUsers(this.state.friendsWeeklyUsers)
      monthlyUsers = this.createUsers(this.state.friendsMonthlyUsers)

      dailyBtn = this.state.friendsDailyLoadCounter * LOAD_COUNT + 10 > this.state.friendsDailyUsers.length
        ? ''
        : <button className="btn btn-primary mt-2" onClick={this.loadDaily}>See more</button>;

      weeklyBtn = this.state.friendsWeeklyLoadCounter * LOAD_COUNT + 10 > this.state.friendsWeeklyUsers.length
        ? ''
        : <button className="btn btn-primary mt-2" onClick={this.loadWeekly}>See more</button>;

      monthlyBtn = this.state.friendsMonthlyLoadCounter * LOAD_COUNT + 10 > this.state.friendsMonthlyUsers.length
        ? ''
        : <button className="btn btn-primary mt-2" onClick={this.loadMonthly}>See more</button>;
    }
    else {
      dailyUsers = this.createUsers(this.state.dailyUsers)
      weeklyUsers = this.createUsers(this.state.weeklyUsers)
      monthlyUsers = this.createUsers(this.state.monthlyUsers)

      dailyBtn = this.state.dailyLoadCounter * LOAD_COUNT + 10 > this.state.dailyUsers.length
        ? ''
        : <button className="btn btn-primary mt-2" onClick={this.loadDaily}>See more</button>;

      weeklyBtn = this.state.weeklyLoadCounter * LOAD_COUNT + 10 > this.state.weeklyUsers.length
        ? ''
        : <button className="btn btn-primary mt-2" onClick={this.loadWeekly}>See more</button>;

      monthlyBtn = this.state.monthlyLoadCounter * LOAD_COUNT + 10 > this.state.monthlyUsers.length
        ? ''
        : <button className="btn btn-primary mt-2" onClick={this.loadMonthly}>See more</button>;
    }

    return (
      <div className="container bg-light pt-2 pb-3">
        <div className="text-center pb-1">
          <img src={leaderboardLogo}
            alt=""
            width="60rem"
          />
          <h3>Top Users</h3>
        </div>
        <div className="row justify-content-center">
          <div className="col-xs">
            <div style={{ transform: 'scale(0.7, 0.7)' }}>
              <label className="switch">
                <input type="checkbox" checked={this.state.friendsOnly} onChange={this.toggleFriendsOnly} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="col-xs pt-2">
            <h6>Friends only</h6>
          </div>
        </div>
        <ul className="nav nav-tabs justify-content-center mx-auto" id="myTab" role="tablist" style={{ width: '30%' }}>
          <li className="nav-item">
            <a className="nav-link active tab-no-outline" id="daily-tab" data-toggle="tab" href="#daily" role="tab">Daily</a>
          </li>
          <li className="nav-item">
            <a className="nav-link tab-no-outline" id="weekly-tab" data-toggle="tab" href="#weekly" role="tab">Weekly</a>
          </li>
          <li className="nav-item">
            <a className="nav-link tab-no-outline" id="monthly-tab" data-toggle="tab" href="#monthly" role="tab">Monthly</a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="pt-4 pb-1 tab-pane fade show active" id="daily" role="tabpanel">
            {!this.state.dailyLoader
              ? dailyUsers.length > 0
                ? dailyUsers
                : <EmptyJordan message="Such empty..." />
              : <Loader show={this.state.dailyLoader} />}
            <div className="text-center">
              {!this.state.loader ? dailyBtn : ''}
            </div>
            <Loader show={this.state.loader} />
          </div>
          <div className="pt-4 pb-1 tab-pane fade" id="weekly" role="tabpanel">
            {!this.state.weeklyLoader
              ? weeklyUsers.length > 0
                ? weeklyUsers
                : <EmptyJordan message="Such empty..." />
              : <Loader show={this.state.weeklyLoader} />}
            <div className="text-center">
              {!this.state.loader ? weeklyBtn : ''}
            </div>
            <Loader show={this.state.loader} />
          </div>
          <div className="pt-4 pb-1 tab-pane fade" id="monthly" role="tabpanel">
            {!this.state.monthlyLoader
              ? monthlyUsers.length > 0
                ? monthlyUsers
                : <EmptyJordan message="Such empty..." />
              : <Loader show={this.state.monthlyLoader} />}
            <div className="text-center">
              {!this.state.loader ? monthlyBtn : ''}
            </div>
            <Loader show={this.state.loader} />
          </div>
        </div>
      </div >
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