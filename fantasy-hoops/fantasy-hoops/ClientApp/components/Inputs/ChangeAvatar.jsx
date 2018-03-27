import React, { Component } from 'react';
import Avatar from 'react-avatar-edit';

export class ChangeAvatar extends Component {
  constructor(props) {
    super(props);
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    this.state = {
      src: null
    }
  }

  onClose() {
    this.setState({ preview: null })
  }

  onCrop(preview) {
    this.setState({ preview })
  }

  render() {
    return (
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Change image </h5>
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
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}