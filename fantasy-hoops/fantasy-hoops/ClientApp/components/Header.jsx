import React, { Component } from 'react';

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
                <a className="dropdown-item" href="#">Daily Top users</a>
                <a className="dropdown-item" href="#">Most selected players</a>
                <a className="dropdown-item" href="/rules">Rules</a>
              </div>
            </li>
          </ul>
          <ul className="nav navbar-nav ml-auto">
            <li className="dropdown">
              <a className="nav-link dropdown-toggle btn-no-outline" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Friend  requests </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item">No friend requests now</a>
              </div>
            </li>
            <li className="dropdown">
              <a className="nav-link dropdown-toggle btn-no-outline" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Account
                  </a>
              <ul className="dropdown-menu dropdown-menu-right">
                <li>
                  <div className="navbar-login">
                    <div className="row">
                      <div className="col-lg-4">
                        <p className="text-center">
                          <img src="https://i.imgur.com/0i1KEYY.png" width="100" height="100" alt="" />
                        </p>
                      </div>
                      <div className="col-lg-8">
                        <p className="text-left"><strong>hooper420</strong></p>
                        <p className="text-left small">fantasy@hoops.com</p>
                        <p className="text-left">
                          <a href="/edit-profile" className="btn btn-primary btn-block btn-sm">Edit profile</a>
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
                          <a href="#" className="btn btn-danger btn-block">Logout</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}