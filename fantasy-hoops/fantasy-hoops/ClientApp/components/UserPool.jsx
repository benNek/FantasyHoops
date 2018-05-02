import React, { Component } from 'react';
import { UserCard } from './Profile/UserCard';
import shortid from 'shortid';
import _ from 'lodash';
import defaultPhoto from '../content/images/default.png';
import { DebounceInput } from 'react-debounce-input';

export class UserPool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIMG: this.getUserImages()
    }
    this.filterList = this.filterList.bind(this);
  }

  filterList(e) {
    if (this.state.initialUsers) {
      let updatedList = this.state.initialUsers;
      updatedList = _.filter(updatedList, user => {
        return user.userName.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      });
      this.setState({ users: updatedList });
    }
  }

  async componentWillMount() {
    await fetch(`http://localhost:51407/api/user`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          initialUsers: res,
          users: res
        });
      })
  }

  render() {
    let users = _.map(
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
    if (users.length < 1)
      users = <div className="m-2 mx-auto">No users</div>;
    return (
      <div className="container bg-light pt-4 pb-2">
        <div className="search m-3 mb-4">
          <span className="fa fa-search"></span>
          <DebounceInput
            className="form-control" type="search" name="search" placeholder="Search..."
            minLength={2}
            debounceTimeout={600}
            onChange={this.filterList} />
        </div>
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