import React, { Component } from 'react';
import { UserCard } from './UserCard'

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: this.props.match.params.edit || ''
    }
    this.editProfile = this.editProfile.bind(this);
  }

  componentDidMount() {
    this.editProfile();
  }

  render() {
    return (
      <div className="container mt-4 bg-light" style={{ paddingTop: '5em' }}>
        <div className="row my-2">
          <div className="col-lg-8 order-lg-2">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a href="" data-target="#profile" data-toggle="tab" id="navLinkProfile" className="nav-link active btn-no-outline">Profile</a>
              </li>
              <li className="nav-item">
                <a href="" data-target="#messages" data-toggle="tab" id="navLinkMessages" className="nav-link btn-no-outline">Friends</a>
              </li>
              <li className="nav-item">
                <a href="" data-target="#edit" data-toggle="tab" id="navLinkEdit" className="nav-link btn-no-outline">Edit</a>
              </li>
            </ul>
            <div className="tab-content py-4">
              <div className="tab-pane active" id="profile">
                <h5 className="mb-3">Username</h5>
                <div className="row">
                  <div className="col-md-6">
                    <h6>About</h6>
                    <p className='about-me'>
                      This is something that describes me as a basketball fan.
                            </p>
                  </div>
                  <div className="col-md-6">
                    <h6 style={{ paddingLeft: '1.1rem' }}>Favorite team</h6>
                    <div className="team-badge">
                      <a href="#" className="badge badge-dark badge-pill" style={{ backgroundColor: '#008248' }} >Boston Celtics</a>
                    </div>
                    <hr />
                    <span className="badge badge-primary"><i className="fa fa-ban"></i> Streak</span>
                    <span className="badge badge-success"><i className="fa fa-cog"></i> Total Score</span>
                    <span className="badge badge-danger"><i className="fa fa-eye"></i> Ranking</span>
                  </div>
                  <div className="col-md-12">
                    <h5 className="mt-2"><span className="fa fa-clock-o ion-clock float-right"></span> Recent Activity</h5>
                    <table className="table table-sm table-hover table-striped">
                      <tbody>
                        <tr>
                          <td>
                            <strong>W</strong> score <strong>`Opponent Name`</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>W</strong> score <strong>`Opponent Name`</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>L</strong> score <strong>`Opponent Name`</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>L</strong> score <strong>`Opponent Name`</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>W</strong> score <strong>`Opponent Name`</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="messages">
                <div className="container">
                  <div className="row">
                    <UserCard
                      userName='Mia'
                      avatar='https://images-na.ssl-images-amazon.com/images/M/MV5BMzc1YTA1ZjItMWRhMy00ZTBlLTkzNTgtNTc4ZDE3YTM3ZDk2XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY1000_SX1000_AL_.jpg'
                      teamColor='#FFC200'
                    />
                    <UserCard
                      userName='Marius J'
                      avatar='https://scontent.fkun1-1.fna.fbcdn.net/v/t1.0-9/13239169_1271047856257485_6830331749001568475_n.jpg?oh=0d53f5d633ac28886a28f4cb526b081f&oe=5B424B97'
                      teamColor='#C4CED4'
                    />
                    <UserCard
                      userName='BMW'
                      avatar='https://scontent.fkun1-1.fna.fbcdn.net/v/t1.0-9/14224681_1835819563319780_8589611419845902340_n.jpg?oh=27fd918775e3d13e4bf6656b419b812a&oe=5B44A3CB'
                      teamColor='#6F2633'
                    />
                    <UserCard
                      userName='Tete'
                      avatar='https://lh6.googleusercontent.com/IZrOBBDE0xJ_5M9uR5pdHUEIYlNODzu30Id5d-vCdJhvWsVGbGxEqHr4rGmK8-Hx-6q_2bYq01P44OHHCtep=w1920-h921'
                      teamColor='#552583'
                    />
                    <UserCard
                      userName='Benas Nekrosius'
                      avatar='https://scontent.fkun1-1.fna.fbcdn.net/v/t1.0-1/22008227_1547763031950103_6781077529679133042_n.jpg?oh=aae2c5d83b199de386a5160861333d37&oe=5B49B5DF'
                      teamColor='#008248'
                    />
                    <UserCard
                      userName='Sapauskas'
                      avatar='https://scontent.fkun1-1.fna.fbcdn.net/v/t1.0-9/22405437_1721131804626423_8370660712586694540_n.jpg?oh=59cfc034b8ce609fd15e5e6a69538e7f&oe=5B3302B6'
                      teamColor='#E56020'
                    />
                    <UserCard
                      userName='Doughnutas'
                      avatar='https://scontent.fkun1-1.fna.fbcdn.net/v/t1.0-9/16426032_1290343324367341_8459229942170318167_n.jpg?oh=bea9b43aecee12c2fbe0289ca5f28f01&oe=5B333938'
                      teamColor='#002D62'
                    />
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="edit">
                <form role="form">
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">First name</label>
                    <div className="col-lg-9">
                      <input className="form-control" type="text" value="Jane" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Email</label>
                    <div className="col-lg-9">
                      <input className="form-control" type="email" value="email@gmail.com" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">About me</label>
                    <div className="col-lg-9">
                      <input className="form-control" type="url" value="" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Favorite team</label>
                    <div className="col-lg-9">
                      <input className="form-control" type="url" value="" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Password</label>
                    <div className="col-lg-9">
                      <input className="form-control" type="password" value="11111122333" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Confirm password</label>
                    <div className="col-lg-9">
                      <input className="form-control" type="password" value="11111122333" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label"></label>
                    <div className="col-lg-9">
                      <input type="reset" className="btn btn-secondary" value="Cancel" />
                      <input type="button" className="btn btn-primary" value="Save Changes" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-4 order-lg-1">
            <img
              src="https://i.imgur.com/0i1KEYY.png"
              width="300"
              height="300"
              className="mx-auto img-fluid img-circle d-block round-img"
              alt="avatar"
            />
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="customFile" />
              <label className="custom-file-label" for="customFile">Choose file</label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  editProfile() {
    if (this.state.edit === 'edit') {
      const edit = document.getElementById('edit');
      const profile = document.getElementById('profile');
      const messages = document.getElementById('messages');
      const editLink = document.getElementById('navLinkEdit');
      const profileLink = document.getElementById('navLinkProfile');
      const messagesLink = document.getElementById('navLinkMessages');
      profile.className = "tab-pane";
      messages.className = "tab-pane";
      edit.className = "tab-pane active show";
      profileLink.className = "nav-link btn-no-outline";
      messagesLink.className = "nav-link btn-no-outline";
      editLink.className = "nav-link active show btn-no-outline";
    }
  }
}
