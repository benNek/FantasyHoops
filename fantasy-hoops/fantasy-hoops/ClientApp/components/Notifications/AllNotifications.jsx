import React, { Component } from 'react';
import { isAuth, parse, logout } from '../../utils/auth';
import { GameScoreNotification } from './GameScoreNotification';
import { InjuryNotification } from './InjuryNotification';
import { FriendRequestNotification } from './FriendRequestNotification';
import { Loader } from '../Loader';
import { EmptyJordan } from '../EmptyJordan';
import shortid from 'shortid';

const user = parse();

export class AllNotifications extends Component {
  constructor(props) {
    super(props);
    this.toggleNotification = this.toggleNotification.bind(this);
    this.loadMore = this.loadMore.bind(this);

    this.state = {
      serverTime: '',
      allNotifications: [],
      userNotifications: [],
      loader: true
    };
  }

  async componentWillMount() {
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
          allNotifications: res,
          userNotifications: res.slice(0, 10),
          loader: false
        });
      })
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
          allNotifications: res,
          userNotifications: res.slice(0, this.state.userNotifications.length)
        });
      });
  }

  async loadMore() {
    this.setState({
      loader: true
    });
    await fetch(`http://localhost:51407/api/notification/${user.id}?start=${this.state.userNotifications.length}&count=5`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          userNotifications: this.state.userNotifications.concat(res),
          loader: false
        });
      });
  }

  getNotifications() {
    if (this.state.userNotifications.length < 1 && !this.state.loader)
      return (
        <div className="p-5">
          <EmptyJordan message="Such empty..." />
        </div>
      );
    const cardWidth = 60;
    return _.slice(this.state.userNotifications)
      .map(notification => {
        if (notification.score)
          return <GameScoreNotification
            key={shortid()}
            width={`${cardWidth}%`}
            serverTime={this.state.serverTime}
            toggleNotification={this.toggleNotification}
            notification={notification}
          />;
        if (notification.friend)
          return <FriendRequestNotification
            key={shortid()}
            width={`${cardWidth}%`}
            serverTime={this.state.serverTime}
            toggleNotification={this.toggleNotification}
            notification={notification}
          />;
        if (notification.player)
          return <InjuryNotification
            key={shortid()}
            width={`${cardWidth}%`}
            serverTime={this.state.serverTime}
            toggleNotification={this.toggleNotification}
            notification={notification}
          />;
      });
  }

  render() {
    const notifications = this.getNotifications();
    const btn = !this.state.loader && notifications.length != this.state.allNotifications.length && this.state.userNotifications.length > 0
      ? <button className="btn btn-primary mt-2" onClick={this.loadMore}>See more</button>
      : '';
    return (
      <div className="container bg-light p-4">
        <h3 className="text-center"><i className="fa fa-bell"></i> User notifications</h3>
        <div className="m-3">
          {notifications}
        </div>
        <div className="text-center">
          {btn}
        </div>
        <Loader show={this.state.loader} />
      </div>
    );
  }
}
