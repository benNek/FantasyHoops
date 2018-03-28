import React, { Component } from 'react';
import Avatar from 'react-avatar-edit';
import { parse } from '../../utils/auth';

export class ChangeAvatar extends Component {
  constructor(props) {
    super(props);
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      preview: null,
      src: null
    }
  }

  onClose() {
    this.setState({ preview: null })
  }

  onCrop(preview) {
    this.setState({ preview })
  }

  handleSubmit() {
    const user = parse();
    const data = {
      id: user.id,
      avatar: this.state.preview
    }
    fetch('http://localhost:51407/api/user/avatar', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  render() {
    return (
      <div className="modal fade" id="changeImage" tabIndex="-1" role="dialog" aria-labelledby="changeImage" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="changeImage">Change image </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body mx-auto">
              <Avatar
                width={350}
                height={250}
                onCrop={this.onCrop}
                onClose={this.onClose}
                src={this.state.src}
              />
            </div>
            <div className="modal-footer">
              <button onClick={this.onClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button onClick={this.handleSubmit} type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}