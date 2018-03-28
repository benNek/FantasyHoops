import React, { Component } from 'react';
import Avatar from 'react-avatar-edit';
import { parse } from '../../utils/auth';
import { handleErrors } from '../../utils/errors'
import { Alert } from '../Alert';

export class ChangeAvatar extends Component {
  constructor(props) {
    super(props);
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      preview: null,
      showAlert: false,
      alertType: '',
      alertText: ''
    }
  }

  onClose() {
    this.setState({
      preview: null,
      showAlert: false,
      alertType: '',
      alertText: ''
    });
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
    })
      .then(res => handleErrors(res))
      .then(res => res.text())
      .then(res => {
        this.setState({
          showAlert: true,
          alertType: 'alert-success',
          alertText: res
        });
      })
      .catch(err => {
        this.setState({
          showAlert: true,
          alertType: 'alert-danger',
          alertText: err.message
        });
      });
  }

  render() {
    return (
      <div className="modal fade" id="changeImage" tabIndex="-1" role="dialog" aria-labelledby="changeImage" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="changeImage">Crop your image</h5>
              <a onClick={this.onClose} type="button btn-no-outline" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </a>
            </div>
            <div className="modal-body mx-auto">
              <Avatar
                width={350}
                height={250}
                onCrop={this.onCrop}
                onClose={this.onClose}
              />
              <div className="mt-3">
                <Alert type={this.state.alertType} text={this.state.alertText} show={this.state.showAlert} />
              </div>
            </div>
            <div className="modal-footer mx-auto">
              <button onClick={this.handleSubmit} type="button" className="btn btn-primary">Save changes</button>
              <button onClick={this.onClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}