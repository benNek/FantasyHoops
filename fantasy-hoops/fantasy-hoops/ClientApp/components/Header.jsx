import React, { Component } from 'react';

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-dark bg-primary">
          <a className="navbar-brand" href="#">
            <img src='http://www.zillakgames.com/web/game-thumbnails/C/classic%20basketball.png' width="30" height="30" className="d-inline-block align-top" alt="" />
            Bootstrap
            </a>
        </nav>
      </div>
    );
  }
}