import React, { Component } from 'react';
import { parse } from '../../../utils/auth';
import { UserCard } from './../UserCard';
import shortid from 'shortid';
import defaultPhoto from '../../../content/images/default.png';

export class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props)
      return;

    fetch(`http://localhost:51407/api/user/friends/${this.props.user.id}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          friends: res
        })
      });

  }

  render() {
    let friends = _.map(this.state.friends,
      (friend) => {
        return <UserCard
          key={shortid()}
          userName={friend.userName}
          avatar={this.props.images[`${friend.id}.png`] || defaultPhoto}
          color={friend.color}
        />
      }
    );
    return (
      <div className="row">
        {friends}
      </div>
    );
  }
}