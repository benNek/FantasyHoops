import React, { Component } from 'react';
import { isAuth, parse, logout } from '../utils/auth';
import defaultPhoto from '../content/images/default.png';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);

    this.state = {
      navHeight: '4rem',
      notificationCount: 0
    };
  }

  increment() {
    this.setState({
      notificationCount: this.state.notificationCount + 1
    });
  }

  render() {
    // Login button in case user is not signed in
    const login = (
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link btn-no-outline" href="/login">Login</a>
        </li>
      </ul>
    );

    // Showing friend requests and profile when player has signed in
    let profile = '';
    let avatar = defaultPhoto;
    if (isAuth()) {
      const user = parse();
      try {
        avatar = require(`../content/images/avatars/${user.id}.png`);
      }
      catch (err) {
      }
      const badge = this.state.notificationCount > 0
        ? <span className="badge badge-danger" style={{ fontSize: '0.8rem', position: 'absolute', marginLeft: '-0.6rem' }}>{this.state.notificationCount}</span>
        : '';
      profile = (
        <ul className="nav navbar-nav ml-auto">
          {/* Just for notification testing */}
          <button
            onClick={this.increment}
            type="button"
            className="btn btn-outline-light"
            style={{ height: '2.5rem' }}
          >
            Test notifications
          </button>
          <li className="dropdown">
            <a
              className="fa fa-bell text-light mt-1 ml-3 nav-link dropdown-toggle no-arrow btn-no-outline"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ fontSize: '2rem' }}
            >{badge}
            </a>
            <div className="dropdown-menu dropdown-menu-right w-100" aria-labelledby="navbarDropdownMenuLink">
              <h6 className="dropdown-header">Notifications</h6>
              <a className="dropdown-item">No notifications</a>
            </div>
          </li>
          <li className="dropdown">
            <a
              className="fa fa-user-circle text-light mt-1 ml-2 mr-3 nav-link dropdown-toggle no-arrow btn-no-outline"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ fontSize: '2rem' }}
            >
            </a>
            <ul className="dropdown-menu dropdown-menu-right">
              <h6 className="dropdown-header">Account</h6>
              <li>
                <div className="navbar-login">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="text-center">
                        <a href='/profile'><img src={avatar} width="100" height="100" alt="" /></a>
                      </p>
                    </div>
                    <div className="col-lg-8">
                      <p className="text-left"><strong>{user.username}</strong></p>
                      <p className="text-left small">{user.email}</p>
                      <p className="text-left">
                        <a href={`/profile/${user.username}/edit`} className="btn btn-primary btn-block btn-sm">Edit profile</a>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li className="divider"></li>
              <li>
                <div className="navbar-login navbar-login-session">
                  <div className="row">
                    <div className="col-lg-12">
                      <p>
                        <a onClick={logout} className="btn btn-light btn-block">Logout</a>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      );
    }

    return (
      <div style={{ paddingTop: this.state.navHeight }}>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand btn-no-outline" href="#">
            <img src={require('../../wwwroot/favicon.ico')} width="40" height="40" alt="Fantasy Hoops" />
            Fantasy Hoops
        </a>
          <button className="navbar-toggler"
            type="button" data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link btn-no-outline" href="/news">News feed<span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn-no-outline" href="/injuries">Injuries feed</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle btn-no-outline"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  Game</a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item btn" href="/lineup">Lineup</a>
                  <a className="dropdown-item" href="/leaderboard/users">Top Users</a>
                  <a className="dropdown-item" href="/leaderboard/players">Top NBA Players</a>
                  <a className="dropdown-item" href="/rules">Rules</a>
                </div>
              </li>
            </ul>
            {isAuth() ? profile : login}
          </div>
        </nav>
      </div>
    );
  }
}