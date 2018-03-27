import React, { Component } from 'react';
import { UserCard } from './UserCard';
import { Input } from '../Inputs/Input';
import { Select } from '../Inputs/Select';
import Textarea from 'react-autosize-textarea';
import defaultPhoto from '../../content/images/default.png';
import { ChangeAvatar } from '../Inputs/ChangeAvatar';
import { parse } from '../../utils/auth';
import { handleErrors } from '../../utils/errors';

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: defaultPhoto,
      edit: this.props.match.params.edit || '',
      username: '',
      email: '',
      about: '',
      password: '',
      newPassword: '',
      confirmNewPassword: '',
      team: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.editProfile();
    fetch(`http://localhost:51407/api/team`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          teams: res
        });
      });
  }

  componentDidUpdate(nextProps, nextState) {
    const btn = document.getElementById('submit');
    if (document.querySelectorAll('.is-invalid').length != 0) {
      btn.className = 'btn btn-primary';
      btn.disabled = true;
      return;
    }
    else {
      const forms = document.querySelectorAll('.form-control');
      for (let i = 0; i < forms.length; i++) {
        if (!forms[i].required)
          continue;
        if (forms[i].value.length === 0) {
          btn.className = 'btn btn-primary';
          btn.disabled = true;
          return;
        }
      }
    }
    btn.className = 'btn btn-primary';
    btn.disabled = false;
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    const user = parse();
    let avatar = defaultPhoto;
    try {
      avatar = require(`../../content/images/avatars/${user.id}.png`);
    }
    catch (err) {
    }
    const teams = this.state.teams;
    const changingPassword = !(this.state.password.length > 0 || this.state.newPassword.length > 0 || this.state.confirmNewPassword.length > 0);
    return (
      <div className="container bg-light pt-1">
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
                      avatar='https://scontent.fkun1-1.fna.fbcdn.net/v/t1.0-9/12552976_1285246738167436_7192865616759638781_n.jpg?oh=1586dc13094e9366b741d973e8ffbb9f&oe=5B4B4128'
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
                <form role="form" onSubmit={this.submit}>
                  <label className="col-lg-3 col-form-label form-control-label"></label>
                  <div className="col-lg-9">
                    <label className="form-group row">PERSONAL INFO</label>
                  </div>
                  <hr className="col-xs-12" />
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Username</label>
                    <div className="col-lg-9">
                      <Input
                        type="text hidden"
                        id="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        regex={/^.{4,11}$|^$/}
                        error="Username must be between 4 and 11 symbols long"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Email</label>
                    <div className="col-lg-9">
                      <Input
                        type="email hidden"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        regex={/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$|^$/i}
                        error="Invalid email"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">About me</label>
                    <div className="col-lg-9">
                      <div className="form-group">
                        <Textarea
                          className="form-control"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Favorite team</label>
                    <div className="col-lg-9">
                      <Select
                        options={teams}
                        id="team"
                        value={this.state.team}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <label className="col-lg-3 col-form-label form-control-label"></label>
                  <div className="col-lg-9">
                    <label className="form-group row">CHANGE PASSWORD</label>
                  </div>
                  <hr className="col-xs-12" />
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Password</label>
                    <div className="col-lg-9">
                      <Input
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        notRequired={changingPassword}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">New password</label>
                    <div className="col-lg-9">
                      <Input
                        type="password"
                        id="newPassword"
                        value={this.state.newPassword}
                        onChange={this.handleChange}
                        regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$|^$/}
                        error="Password must contain: 8-20 characters. At least one uppercase letter. At least one number."
                        notRequired={changingPassword}
                        children="confirmNewPassword"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Confirm new password</label>
                    <div className="col-lg-9">
                      <Input
                        type="password"
                        id="confirmNewPassword"
                        value={this.state.confirmNewPassword}
                        onChange={this.handleChange}
                        match="newPassword"
                        error="Passwords must match"
                        notRequired={changingPassword}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label"></label>
                    <div className="col-lg-9">
                      <button type="reset" className="btn btn-secondary mr-2">Cancel</button>
                      <button id="submit" disabled className="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-4 order-lg-1">
            <img
              src={avatar} alt="Preview"
              className="mx-auto img-fluid img-circle d-block round-img"
              style={{width: '50%'}}
            />
            <div className="row">
              <button type="button" className="btn btn-outline-primary mx-auto" data-toggle="modal" data-target="#changeImage">
                Change image
              </button>
            </div>
          </div>
          <ChangeAvatar />
        </div>
      </div>
    );
  }
  submit(e) {
    e.preventDefault();
    const user = parse();
    const data = {
      Id: user.id,
      UserName: this.state.username,
      Email: this.state.email,
      Description: this.state.about,
      FavoriteTeamId: this.state.team,
      CurrentPassword: this.state.password,
      NewPassword: this.state.newPassword,
    };

    fetch('/api/user/editprofile', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => handleErrors(res))
      .then(res => res.text())
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
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


