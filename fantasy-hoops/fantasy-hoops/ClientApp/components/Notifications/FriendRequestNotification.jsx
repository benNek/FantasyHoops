import React, { Component } from 'react';
import moment from 'moment';

export class FriendRequestNotification extends Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);

    this.state = {
    }
  }

  select() {
    this.props.toggleNotification(this.props.notification);
  }

  getDate() {
    const date = new Date(this.props.notification.dateCreated);
    const serverTime = new Date(this.props.serverTime);
    const diff = Math.abs(serverTime.getTimezoneOffset()) / 60;
    return date.setHours(date.getHours() + diff);
  }

  render() {
    let read = "card-body text-primary";
    if (this.props.notification.readStatus)
      read = "card-body text-muted";
    return (
      <a onClick={this.select} className="dropdown-item cursor-default text-center card cursor-pointer link" style={{ width: '24rem' }}>
        <div className={read} style={{ margin: '-0.6rem' }}>
          <div className="row">
            <div className="pic">
              <img className="mt-2" src={require(`../../content/images/avatars/${this.props.notification.friendID}.png`)} width="57rem" />
            </div>
            <h5 className="card-text col-1 ml-1">User</h5>
            <h5 className="card-text col-1 ml-3 font-weight-bold"> {this.props.notification.friend.userName}</h5>
            <p className="text pt-4" style={{ marginTop: '0.3rem' }}>
              <span className="text" style={{ marginLeft: '-3.7rem' }}>{this.props.notification.requestMessage} </span>
            </p>
            <p className="text pt-2 pl-3" style={{ margin: '-1.2rem 0 0 0', marginLeft: '3.8rem' }}> {moment(this.getDate()).fromNow()}
            </p>
          </div>
        </div>
      </a>
    );
  }
}
