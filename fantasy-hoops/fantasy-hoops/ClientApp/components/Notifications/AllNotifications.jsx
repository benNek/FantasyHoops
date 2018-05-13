import React, { Component } from 'react';
import { isAuth, parse, logout } from '../../utils/auth';
import { GameScoreNotification } from './GameScoreNotification';
import { InjuryNotification } from './InjuryNotification';
import { FriendRequestNotification } from './FriendRequestNotification';
import InfiniteScroll from 'react-infinite-scroll-component';
import shortid from 'shortid';

const user = parse();

export class AllNotifications extends Component {
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
      return <a className="text-center">No notifications</a>;
    return _.slice(this.state.userNotifications)
      .map(notification => {
        if (notification.score)
          return <GameScoreNotification
            key={shortid()}
            serverTime={this.state.serverTime}
            toggleNotification={this.toggleNotification}
            notification={notification}
          />;
        if (notification.friend)
          return <FriendRequestNotification
            key={shortid()}
            serverTime={this.state.serverTime}
            toggleNotification={this.toggleNotification}
            notification={notification}
          />;
        if (notification.player)
          return <InjuryNotification
            key={shortid()}
            serverTime={this.state.serverTime}
            toggleNotification={this.toggleNotification}
            notification={notification}
          />;
      });
  }


  render() {
    
    const notifications = this.getNotifications();
    return (
     <a  className="right">
     <div className="container right bg-light">
      <InfiniteScroll >
      <a
              onClick={this.readAll}
              className="center btn-no-outline"
              style={{}}
              href="javascript:void(0);"
            >
              Mark All as Read
            </a>
       <div className="" style={{paddingLeft: "22rem", paddingTop: "2rem"}}>
       <h12 className="" style={{fontSize: '40', paddingLeft: '3.5rem', marginTop: -50}}>All notifications</h12>
      <div className="" style={{ marginBottom: '2rem', marginTop: '2rem'}}>
          {notifications}  
          </div>
          </div> 
          
        </InfiniteScroll>
        </div>
       </a>
    );
  }
}
