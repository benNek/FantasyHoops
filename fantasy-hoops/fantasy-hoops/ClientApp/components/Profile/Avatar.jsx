import React, { Component } from 'react';
import { ChangeAvatar } from '../Inputs/ChangeAvatar';
import defaultPhoto from '../../content/images/default.png';

export class Avatar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user;
    let avatar = defaultPhoto;
    try {
      avatar = require(`../../content/images/avatars/${user.id}.png`);
    }
    catch (err) {
    }

    return (
      <div className="col-lg-4 order-lg-1">
        <div className="row">
          <h3 className="mt-3 mx-auto">{user.username}</h3>
        </div>
        <img
          src={avatar} alt="Preview"
          className="mx-auto img-fluid img-circle d-block round-img"
          style={{ width: '10rem' }}
        />
        {!this.props.readOnly &&
          <div className="row">
            <button type="button" className="btn btn-outline-primary mx-auto" data-toggle="modal" data-target="#changeImage">
              Change avatar
            </button>
            <ChangeAvatar />
          </div>
        }

      </div>
    );
  }
}
