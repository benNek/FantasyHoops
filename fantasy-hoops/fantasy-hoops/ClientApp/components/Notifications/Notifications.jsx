import React, { Component } from 'react';
import { isAuth, parse, logout } from '../../utils/auth';
import { GameScoreCard } from './GameScoreCard';
import shortid from 'shortid';
const user = parse();

export class Notifications extends Component {
  constructor(props) {
    super(props);
    this.toggleNotification = this.toggleNotification.bind(this);
    this.readAll = this.readAll.bind(this);

    this.state = {
      serverTime: '',
      userNotifications: '',
      unreadCount: 0
    };
  }

  async componentDidMount() {
    await fetch(`http://localhost:51407/api/lineup/nextGame`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          serverTime: res.serverTime
        });
      })
    await fetch(`http://localhost:51407/api/notification/${user.id}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          userNotifications: res,
          unreadCount: res.filter(n => n.readStatus == false).length
        });
      })
    await fetch(`http://localhost:51407/api/notification/`)
      .then(res => {
        return res.json()
      });
  }

  async toggleNotification(notification) {
    if (notification.readStatus)
      return;
    const data = {
      notificationID: notification.notificationID,
      userID: notification.userID
    }
    await fetch('http://localhost:51407/api/notification/toggle', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(notification)
    })
      .then(res => handleErrors(res))
      .then(res => res.text())
      .catch(err => {
      });

    await fetch(`http://localhost:51407/api/notification/${user.id}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          userNotifications: res,
          unreadCount: res.filter(n => n.readStatus == false).length
        });
      });
  }

  async readAll() {
    await fetch(`http://localhost:51407/api/notification/readall/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => handleErrors(res))
      .then(res => res.text())
      .catch(err => {
      });

    fetch(`http://localhost:51407/api/notification/${user.id}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          userNotifications: res,
          unreadCount: res.filter(n => n.readStatus == false).length
        });
      })
  }

  getNotifications() {
    if (this.state.userNotifications.length < 1)
      return <a className="dropdown-item cursor-default text-center">No notifications</a>;
    return _.slice(this.state.userNotifications, 0, 5)
      .map(notification => {
        if (notification.score)
          return <GameScoreCard
            serverTime={this.state.serverTime}
            key={shortid()}
            toggleNotification={this.toggleNotification}
            notification={notification}
          />;
        if (notification.friend)
          return <a key={shortid()} className="dropdown-item cursor-default text-center">{notification.message}</a>;
        if (notification.injury)
          return <a key={shortid()} className="dropdown-item cursor-default text-center">{notification.injury.player.firstName} {notification.injury.player.lastName} {notification.injury.injury}</a>;
      });
  }

  render() {
    const badge = this.state.unreadCount > 0
      ? <span className="badge badge-danger" style={{ fontSize: '0.8rem', position: 'absolute', marginLeft: '-0.6rem' }}>{this.state.unreadCount}</span>
      : '';
    const notifications = this.getNotifications();
    return (
      <li className="dropdown">
        <a
          className="fa fa-bell text-light mt-1 mr-1 ml-3 nav-link dropdown-toggle no-arrow btn-no-outline"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style={{ fontSize: '2rem' }}
        >{badge}
        </a>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink" style={{ width: '22rem' }}>
          <h6 className="dropdown-header">Notifications
          <a
              onClick={this.readAll}
              className="position-absolute"
              style={{ right: '1rem' }}
              href="javascript:void(0);"
            >
              Mark All as Read
            </a>
          </h6>
          <div style={{ marginBottom: '-0.5rem' }}>
            {notifications}
          </div>
        </div>
      </li>
    );
  }
}
