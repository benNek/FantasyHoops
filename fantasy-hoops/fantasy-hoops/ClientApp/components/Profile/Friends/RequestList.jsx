import React, { Component } from 'react';
import { parse } from '../../../utils/auth';
import { UserCard } from './../UserCard';
import { RequestCard } from './RequestCard';
import shortid from 'shortid';
import defaultPhoto from '../../../content/images/default.png';

export class RequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props)
      return;

    fetch(`http://localhost:51407/api/friendrequest/requests/${this.props.user.id}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          list: res
        })
      });

  }

  render() {
    let list = _.map(this.state.list,
      (friend) => {
        return <RequestCard
          key={shortid()}
          id={friend.id}
          userName={friend.userName}
          avatar={this.props.images[`${friend.id}.png`] || defaultPhoto}
          cancel={this.cancelRequest}
          type="request"
        />
      }
    );
    return (
      <div className="row">
        {list.length > 0 ? list : 'You have no requests!'}
      </div>
    );
  }

  cancelRequest(receiver) {
    const sender = parse();
    if (!sender)
      return;

    const model = {
      senderID: sender.id,
      receiverID: receiver
    }

    fetch('/api/friendrequest/cancel', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(model)
    })
      .then(res => {
        location.reload();
      });
  }


}