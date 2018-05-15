import React, { Component } from 'react';
import { UserCard } from './Profile/UserCard';
import shortid from 'shortid';
import _ from 'lodash';
import defaultPhoto from '../content/images/default.png';
import { DebounceInput } from 'react-debounce-input';
import { importAll } from '../utils/reusableFunctions';
import { Loader } from './Loader';

export class UserPool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
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
          users: res,
          loader: false
        });
      })
  }

  render() {
    if (this.state.loader)
      return <div className="m-5"><Loader show={this.state.loader} /></div>;

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

  getUserImages() {
    try {
      return importAll(require.context('../content/images/avatars', false, /\.(png|jpe?g|svg)$/))
    }
    catch (err) {
      return ''
    }
  }
}