import React, { Component } from 'react';
import { parse } from '../../utils/auth';
import { handleErrors } from '../../utils/errors';

export class FriendRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '-1'
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps == this.props)
      return;

    const sender = parse();
    if (!sender || !this.props.user)
      return;

    const receiver = this.props.user;
    if (receiver.id == sender.id) {
      this.setState({
        status: '-2'
      });
      return;
    }

    const model = {
      senderID: sender.id,
      receiverID: receiver.id
    }

    fetch('/api/friendrequest/status', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(model)
    })
      .then(res => handleErrors(res))
      .then(res => res.text())
      .then(res => {
        this.setState({
          status: res
        })
      });
  }

  render() {
    let btn;
    //console.log(this.state.status);
    switch (this.state.status) {
      case '-2':
        btn = '';
        break;
      case '0':
        btn = <button
          type="button"
          onMouseEnter={e => this.onPendingMouseEnter(e)}
          onMouseLeave={e => this.onPendingMouseLeave(e)}
          onClick={e => this.cancelFriendRequest(this.props.user)}
          className="btn btn-warning mx-auto">
          Pending Request
          </button>;
        break;
      case '1':
        btn = <button type="button" onClick={e => this.acceptFriendRequest(this.props.user)} className="btn btn-success mx-auto">Friends</button>;
        break;
      case '200':
        btn = <button type="button" onClick={e => this.acceptFriendRequest(this.props.user)} className="btn btn-outline-success mx-auto">Accept Request</button>;
        break;
      default:
        btn = <button type="button" onClick={e => this.sendFriendRequest(this.props.user)} className="btn btn-outline-secondary mx-auto">Send Friend Request</button>;
        break;
    }

    return (
      <div className="row">
        {btn}
      </div>
    );
  }

  sendFriendRequest(receiver) {
    const sender = parse();
    if (!sender)
      return;

    const model = {
      senderID: sender.id,
      receiverID: receiver.id
    }

    fetch('/api/friendrequest/send', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(model)
    })
      .then(res => {
        this.setState({
          status: '0'
        });
      });
  }

  acceptFriendRequest(receiver) {
    const sender = parse();
    if (!sender)
      return;

    const model = {
      senderID: sender.id,
      receiverID: receiver.id
    }

    fetch('/api/friendrequest/accept', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(model)
    })
      .then(res => {
        this.setState({
          status: '2'
        });
      });
  }

  cancelFriendRequest(receiver) {
    const sender = parse();
    if (!sender)
      return;

    const model = {
      senderID: sender.id,
      receiverID: receiver.id
    }

    fetch('/api/friendrequest/cancel', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(model)
    })
      .then(res => {
        this.setState({
          status: '3'
        });
      });
  }

  onPendingMouseEnter(e) {
    e.target.className = 'btn btn-danger mx-auto';
    e.target.innerText = 'Cancel Request'
  }

  onPendingMouseLeave(e) {
    e.target.className = 'btn btn-warning mx-auto';
    e.target.innerText = 'Pending Request'
  }
}