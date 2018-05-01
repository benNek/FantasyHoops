import React, { Component } from 'react';
import moment from 'moment';

export class GameScoreNotification extends Component {
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
      <a onClick={this.select} className="dropdown-item cursor-default card cursor-pointer link" style={{ width: '24rem' }}>
        <div className={read} style={{ margin: '-0.6rem' }}>
          <div className="row mr-3">
            <div className="a">
              <img className="pt-1" src={require('../../../wwwroot/favicon.ico')} width="60rem" />
            </div>
            <div className="col mr-1">
              <h5 className="card-title">The game has finished!</h5>
              <p className="card-text"
                style={{ marginTop: '-0.5rem', fontWeight: '400' }}
              >Your lineup scored <span className="text-dark font-weight-bold">{this.props.notification.score} FP</span>
              </p>
              <p style={{ margin: '-0.8rem 0 0 0' }}> {moment(this.getDate()).fromNow()}
              </p>
            </div>
          </div>
        </div>
      </a>
    );
  }
}
