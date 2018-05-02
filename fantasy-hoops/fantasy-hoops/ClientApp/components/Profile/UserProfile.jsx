import React, { Component } from 'react';
import { parse } from '../../utils/auth';
import { Avatar } from './Avatar';
import { EditProfile } from './EditProfile';
import { InfoPanel } from './InfoPanel';
import { Friends } from './Friends/Friends';
import { Error } from '../Error';
import { handleErrors } from '../../utils/errors'

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: this.props.match.params.edit || '',
      user: '',
      readOnly: false,
      error: false,
      errorStatus: '200',
      errorMessage: ''
    }
  }

  componentDidMount() {
    const loggedInAsSameUser = (this.props.match.params.name != null && parse().username.toLowerCase() == this.props.match.params.name.toLowerCase());
    if (this.props.match.params.name == null || loggedInAsSameUser) {
      this.editProfile();
      const user = parse();
      fetch(`http://localhost:51407/api/user/${user.id}`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            user: res
          });
        });
    }
    else {
      const userName = this.props.match.params.name;
      this.setState({
        readOnly: true
      });
      fetch(`http://localhost:51407/api/user/name/${userName}`)
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
          this.setState({
            user: res
          });
        })
        .catch(err => {
          const status = err.message.substring(0, 3);
          const message = err.message.substring(4);
          this.setState({
            error: true,
            errorStatus: status,
            errorMessage: message
          });
        });
    }

  }

  render() {
    if (this.state.error) {
      return (
        <Error status={this.state.errorStatus} message={this.state.errorMessage}/>
      );
    }
    return (
      <div className="container bg-light pt-1" style={{ minWidth: '70rem' }}>
        <div className="row p-4">
          <Avatar user={this.state.user} readOnly={this.state.readOnly} />
          <div className="col-lg-8 order-lg-2">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a href="" data-target="#profile" data-toggle="tab" id="navLinkProfile" className="nav-link active tab-no-outline">Profile</a>
              </li>
              <li className="nav-item">
                <a href="" data-target="#friends" data-toggle="tab" id="navLinkFriends" className="nav-link tab-no-outline">Friends</a>
              </li>
              {!this.state.readOnly &&
                <li className="nav-item">
                  <a href="" data-target="#edit" data-toggle="tab" id="navLinkEdit" className="nav-link tab-no-outline">Edit</a>
                </li>
              }
            </ul>
            <div className="tab-content py-4">
              <InfoPanel user={this.state.user} />
              <Friends user={this.state.user} />
              <EditProfile user={this.state.user} />
            </div>
          </div>
        </div>
      </div >
    );
  }

  editProfile() {
    if (this.state.edit === 'edit') {
      const edit = document.getElementById('edit');
      const profile = document.getElementById('profile');
      const friends = document.getElementById('friends');
      const editLink = document.getElementById('navLinkEdit');
      const profileLink = document.getElementById('navLinkProfile');
      const friendsLink = document.getElementById('navLinkFriends');
      profile.className = "tab-pane";
      friends.className = "tab-pane";
      edit.className = "tab-pane active show";
      profileLink.className = "nav-link btn-no-outline";
      friendsLink.className = "nav-link btn-no-outline";
      editLink.className = "nav-link active show btn-no-outline";
    }
  }
}


