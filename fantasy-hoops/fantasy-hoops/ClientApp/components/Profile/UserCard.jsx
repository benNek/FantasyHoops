import React, { Component } from 'react';

export class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <a href={`/profile/${this.props.userName}`} className="friend-card m-3" style={{ backgroundColor: `${this.props.color}`, width: '8rem' }}>
        <canvas className="header-bg" width="250" height="70" id="header-blur"></canvas>
        <div className="avatar">
          <img src={this.props.avatar} alt="" />
        </div>
        <div className="content badge badge-dark" style={{ marginTop: '1rem', marginBottom: '0.5rem', fontSize: '1rem' }}>
          <span>{this.props.userName}</span>
        </div>
      </a>
    );
  }
}
