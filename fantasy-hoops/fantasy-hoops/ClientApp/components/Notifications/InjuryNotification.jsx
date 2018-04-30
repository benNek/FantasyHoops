import React, { Component } from 'react';
import moment from 'moment';

export class InjuryNotification extends Component {
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
      <a
        onClick={this.select}
        className="dropdown-item cursor-default text-center"
      >
        {this.props.notification.player.firstName} {this.props.notification.player.lastName} is {this.props.notification.injuryStatus.toLowerCase()}: {this.props.notification.injuryDescription}
      </a>
    );
  }
}
