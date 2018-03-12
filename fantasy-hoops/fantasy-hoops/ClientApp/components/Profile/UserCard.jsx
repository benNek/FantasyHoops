import React, { Component } from 'react';

export class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const photo='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05-WvgvoVVFR0fQCTWhyhiTHGinaX4FK8-Dux8QrLzrSZ8oQ3SQ';
    return (
      <div className="col-sm-3" >
        <div className="friend-card" style={{backgroundColor: `${this.props.teamColor}`}}>
          <canvas className="header-bg" width="250" height="70" id="header-blur"></canvas>
          <div className="avatar">
            <img src={this.props.avatar||photo} alt="" />
          </div>
          <div className="content badge badge-dark" style={{marginTop: '1rem', marginBottom: '0.5rem', fontSize: '1rem'}}>
            <span>{this.props.userName}</span>
          </div>
        </div>
      </div>
    );
  }
}
