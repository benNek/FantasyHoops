import React, { Component } from 'react';
import { parse } from '../../../utils/auth';
import { FriendList } from './FriendList';
import { PendingList } from './PendingList';
import { RequestList } from './RequestList';
import { importAll } from '../../../utils/reusableFunctions';

export class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userImages: this.getUserImages()
    }
  }

  render() {
    const loggedInAsSameUser = (this.props.user.userName != null && parse().username.toLowerCase() == this.props.user.userName.toLowerCase());
    return (
      <div className="tab-pane" id="friends">
        <div className="container">
          {loggedInAsSameUser &&
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="pills-friends-tab" data-toggle="pill" href="#pills-friends" role="tab" aria-controls="pills-friends" aria-selected="true">Current friends</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="pills-pending-tab" data-toggle="pill" href="#pills-pending" role="tab" aria-controls="pills-pending" aria-selected="false">Pending requests</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="pills-requests-tab" data-toggle="pill" href="#pills-requests" role="tab" aria-controls="pills-requests" aria-selected="false">Your requests</a>
              </li>
            </ul>
          }
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-friends" role="tabpanel" aria-labelledby="pills-friends-tab">
              <FriendList user={this.props.user} images={this.state.userImages} />
            </div>
            <div className="tab-pane fade" id="pills-pending" role="tabpanel" aria-labelledby="pills-pending-tab">
              <PendingList user={this.props.user} images={this.state.userImages} />
            </div>
            <div className="tab-pane fade" id="pills-requests" role="tabpanel" aria-labelledby="pills-requests-tab">
              <RequestList user={this.props.user} images={this.state.userImages} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  getUserImages() {
    try {
      return importAll(require.context('../../../content/images/avatars', false, /\.(png|jpe?g|svg)$/))
    }
    catch (err) {
      return ''
    }
  }
}
