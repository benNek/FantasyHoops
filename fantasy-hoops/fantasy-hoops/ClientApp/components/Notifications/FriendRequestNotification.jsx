import React, { Component } from 'react';
import moment from 'moment';
import defaultPhoto from '../../content/images/default.png'

export class FriendRequestNotification extends Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
  }

  async select() {
    await this.props.toggleNotification(this.props.notification);
    window.location.href = `/profile/${this.props.notification.friend.userName}`
  }

  getDate() {
    const date = new Date(this.props.notification.dateCreated);
    const serverTime = new Date(this.props.serverTime);
    const diff = Math.abs(serverTime.getTimezoneOffset()) / 60;
    return date.setHours(date.getHours() + diff);
  }

  render() {
    let read = "card-body text-primary";
    let avatar = defaultPhoto;
    if (this.props.notification.readStatus)
      read = "card-body text-muted";
    try {
      avatar = require(`../../content/images/avatars/${this.props.notification.friendID}.png`);
    }
    catch (err) {
    }
    return (
      <a onClick={this.select} className="card cursor-pointer link mx-auto" style={{ maxWidth: `${this.props.width}` }}>
        <div className={read} style={{ margin: '-0.6rem' }}>
          <div className="row">
            <div className="col-1 mr-3">
              <img className="mt-2" src={avatar} width="40rem" height="40rem" />
            </div>
            <div className="col ml-1">
              <h5 className="card-title">{this.props.notification.friend.userName}</h5>
              <p className="card-text"
                style={{ marginTop: '-0.7rem', fontWeight: '400' }}
              >{this.props.notification.requestMessage}
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
