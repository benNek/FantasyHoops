import React, { Component } from 'react';
import moment from 'moment';

export class InjuryNotification extends Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
  }

  async select() {
    await this.props.toggleNotification(this.props.notification);
    window.location.href = '/lineup';
  }

  getDate() {
    const date = new Date(this.props.notification.dateCreated);
    const serverTime = new Date(this.props.serverTime);
    const diff = Math.abs(serverTime.getTimezoneOffset()) / 60;
    return date.setHours(date.getHours() + diff);
  }

  render() {
    let read = "card-body rounded text-primary";
    if (this.props.notification.readStatus)
      read = "card-body text-muted";

    let photo = '';
    try {
      photo = require(`../../content/images/players/${this.props.notification.player.nbaID}.png`)
    }
    catch (err) {
      photo = require(`../../content/images/positions/${this.props.notification.player.position.toLowerCase()}.png`)
    }
    return (
      <a onClick={this.select} className="card cursor-pointer link" style={{ width: '25rem' }}>
        <div className={read} style={{ margin: '-0.6rem' }}>
          <div className="row">
            <div className="col-1 mr-3">
              <div
                className="notification-circle position-absolute"
                style={{ backgroundColor: this.props.notification.player.team.color }}>
                <img
                  className="notification-card-player"
                  src={photo}
                />
              </div>
            </div>
            <div className="col ml-1 mr-4" style={{ overflow: 'hidden' }}>
              <h5
                className="card-title text-nowrap"
              >
                {this.props.notification.player.firstName[0]}.
                {' ' + this.props.notification.player.lastName} is {this.props.notification.injuryStatus.toLowerCase()}
              </h5>
              <p className="card-text"
                style={{ marginTop: '-0.7rem', fontWeight: '400' }}
              >{this.props.notification.injuryDescription}
              </p>
              <p style={{ margin: '-1rem 0 0 0' }}>
                {moment(this.getDate()).fromNow()}
              </p>
            </div>
          </div>
        </div>
      </a>
    );
  }
}
