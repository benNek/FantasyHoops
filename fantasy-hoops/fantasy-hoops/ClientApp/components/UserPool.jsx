import React, { Component } from 'react';
import { UserCard } from './Profile/UserCard';
import _ from 'lodash';

export class UserPool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: '',
    }
  }

  componentDidMount() {
    fetch(`http://localhost:51407/api/user/users`)
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
          return
          <UserCard
            userName={this.props.users}
            teamColor='#C4CED4'
          />
        }
      }
    );
    return (
      <div className="container bg-light pt-4 pb-2">
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
        </form>
        <div className="center col">
          <div className="row">
            {users}
          </div>
        </div>
      </div >
    );
  }
}