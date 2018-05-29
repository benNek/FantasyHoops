import React, { Component } from 'react';
import { parse } from '../../utils/auth';
import { handleErrors } from '../../utils/errors';
import { Loader } from '../Loader';

export class FriendRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '-2'
    }
  }

  async componentDidUpdate(prevProps, prevState) {
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

    await fetch('/api/friendrequest/status', {
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
    switch (this.state.status) {
      case '-2':
        btn = <Loader show={true} />;
        break;
      case '0':
        btn = <button
          type="button"
          onMouseEnter={e => this.changeButton(e, 'btn-danger', 'Cancel Request')}
          onMouseLeave={e => this.changeButton(e, 'btn-warning', 'Pending Request')}
          onClick={e => this.cancelFriendRequest(this.props.user)}
          className="btn btn-warning mx-auto">
          Pending Request
          </button>;
        break;
      case '1':
        btn = <button
          type="button"
          onMouseEnter={e => this.changeButton(e, 'btn-danger', 'Remove Friend')}
          onMouseLeave={e => this.changeButton(e, 'btn-success', 'Friends')}
          onClick={e => this.removeFriend(this.props.user)}
          className="btn btn-success mx-auto">
          Friends
          </button>;
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

  async sendFriendRequest(receiver) {
    const sender = parse();
    if (!sender)
      return;

    const model = {
      senderID: sender.id,
      receiverID: receiver.id
    }

    await fetch('/api/friendrequest/send', {
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

  async acceptFriendRequest(receiver) {
    const sender = parse();
    if (!sender)
      return;

    const model = {
      senderID: sender.id,
      receiverID: receiver.id
    }

    await fetch('/api/friendrequest/accept', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(model)
    })
      .then(res => {
        this.setState({
          status: '1'
        });
      });
  }

  async cancelFriendRequest(receiver) {
    const sender = parse();
    if (!sender)
      return;

    const model = {
      senderID: sender.id,
      receiverID: receiver.id
    }

    await fetch('/api/friendrequest/cancel', {
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

  async removeFriend(receiver) {
    const sender = parse();
    if (!sender)
      return;

    const model = {
      senderID: sender.id,
      receiverID: receiver.id
    }

    await fetch('/api/friendrequest/remove', {
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

  changeButton(e, className, text) {
    e.target.className = 'btn mx-auto ' + className;
    e.target.innerText = text;
  }

}