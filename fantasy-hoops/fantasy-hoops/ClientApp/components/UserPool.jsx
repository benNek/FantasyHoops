import React, { Component } from 'react';
import { UserCard } from './Profile/UserCard';
import shortid from 'shortid';
import _ from 'lodash';
import defaultPhoto from '../content/images/default.png';

export class UserPool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: '',
      userIMG: this.getUserImages()
    }
  }

  async componentDidMount() {
    await fetch(`http://localhost:51407/api/user`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          users: res,
        });
      })
  }

  render() {
    const users = _.map(
      this.state.users,
      (user) => {
        {
          return <UserCard
            key={shortid()}
            avatar={this.state.userIMG[`${user.id}.png`] || defaultPhoto}
            userName={user.userName}
            color={user.color}
          />
        }
      }
    );
    return (
      <div className="container bg-light pt-4 pb-2">
        <input className="form-control m-3 mb-4" type="search" placeholder="Search" aria-label="Search" style={{ width: '20rem' }} />
        <div className="center col">
          <div className="row">
            {users}
          </div>
        </div>
      </div >
    );
  }

  importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  getUserImages() {
    try {
      return this.importAll(require.context('../content/images/avatars', false, /\.(png|jpe?g|svg)$/))
    }
    catch (err) {
      return ''
    }
  }
}