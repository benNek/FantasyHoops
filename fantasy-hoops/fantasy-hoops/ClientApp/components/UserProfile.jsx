import React, { Component } from 'react';

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
                <a href="" data-target="#profile" data-toggle="tab" id="navLinkProfile" className="nav-link active">Profile</a>
              </li>
              <li className="nav-item">
                <a href="" data-target="#messages" data-toggle="tab" id="navLinkMessages" className="nav-link">Messages</a>
              </li>
              <li className="nav-item">
                <a href="" data-target="#edit" data-toggle="tab" id="navLinkEdit" className="nav-link">Edit</a>
              </li>
            </ul>
            <div className="tab-content py-4">
              <div className="tab-pane active" id="profile">
                <h5 className="mb-3">User Profile</h5>
                <div className="row">
                  <div className="col-md-6">
                    <h6>About</h6>
                    <p className='about-me'>
                      Web Designer, UI/UX Engineer asdfsadfdsfhfffffffffffffffffffffff
                            </p>
                  </div>
                  <div className="col-md-6">
                    <h6 style={{ paddingLeft: '1.1rem' }}>Recent badges</h6>
                    <div className="team-badge">
                      <a href="#" className="badge badge-dark badge-pill" style={{ backgroundColor: '#008248' }} >Boston Celtics</a>
                    </div>
                    <hr />
                    <span className="badge badge-primary"><i className="fa fa-user"></i> 900 Followers</span>
                    <span className="badge badge-success"><i className="fa fa-cog"></i> 43 Forks</span>
                    <span className="badge badge-danger"><i className="fa fa-eye"></i> 245 Views</span>
                  </div>
                  <div className="col-md-12">
                    <h5 className="mt-2"><span className="fa fa-clock-o ion-clock float-right"></span> Recent Activity</h5>
                    <table className="table table-sm table-hover table-striped">
                      <tbody>
                        <tr>
                          <td>
                            <strong>Abby</strong> joined ACME Project Team in <strong>`Collaboration`</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Gary</strong> deleted My Board1 in <strong>`Discussions`</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Kensington</strong> deleted MyBoard3 in <strong>`Discussions`</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>John</strong> deleted My Board1 in <strong>`Discussions`</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Skell</strong> deleted his post Look at Why this is.. in <strong>`Discussions`</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="messages">
                <div className="alert alert-info alert-dismissable">
                  <a className="panel-close close" data-dismiss="alert">×</a> This is an <strong>.alert</strong>. Use this to show important messages to the user.
                    </div>
                <table className="table table-hover table-striped">
                  <tbody>
                    <tr>
                      <td>
                        <span className="float-right font-weight-bold">3 hrs ago</span> Here is your a link to the latest summary report from the..
                                </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="float-right font-weight-bold">Yesterday</span> There has been a request on your account since that was..
                                </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="float-right font-weight-bold">9/10</span> Porttitor vitae ultrices quis, dapibus id dolor. Morbi venenatis lacinia rhoncus.
                                </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="float-right font-weight-bold">9/4</span> Vestibulum tincidunt ullamcorper eros eget luctus.
                                </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="float-right font-weight-bold">9/4</span> Maxamillion ais the fix for tibulum tincidunt ullamcorper eros.
                                </td>
                    </tr>
                  </tbody>
                </table>
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
                    <label className="col-lg-3 col-form-label form-control-label">Last name</label>
                    <div className="col-lg-9">
                      <input className="form-control" type="text" value="Bishop" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Email</label>
                    <div className="col-lg-9">
                      <input className="form-control" type="email" value="email@gmail.com" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Company</label>
                    <div className="col-lg-9">
                      <input className="form-control" type="text" value="" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Website</label>
                    <div className="col-lg-9">
                      <input className="form-control" type="url" value="" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Address</label>
                    <div className="col-lg-9">
                      <input className="form-control" type="text" value="" placeholder="Street" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label"></label>
                    <div className="col-lg-6">
                      <input className="form-control" type="text" value="" placeholder="City" />
                    </div>
                    <div className="col-lg-3">
                      <input className="form-control" type="text" value="" placeholder="State" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Time Zone</label>
                    <div className="col-lg-9">
                      <select id="user_time_zone" className="form-control" size="0">
                        <option value="Hawaii">(GMT-10:00) Hawaii</option>
                        <option value="Alaska">(GMT-09:00) Alaska</option>
                        <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                        <option value="Arizona">(GMT-07:00) Arizona</option>
                        <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                        <option value="Central Time (US &amp; Canada)" value="selected">(GMT-06:00) Central Time (US &amp; Canada)</option>
                        <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                        <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Username</label>
                    <div className="col-lg-9">
                      <input className="form-control" type="text" value="janeuser" />
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
          <div className="col-lg-4 order-lg-1 text-center">
            <img src="https://i.imgur.com/0i1KEYY.png" width="300" height="300" className="mx-auto img-fluid img-circle d-block" alt="avatar" />
            <h6 className="mt-2">Upload a different photo</h6>
            <label className="custom-file">
              <input type="file" id="file" className="custom-file-input" />
              <span className="custom-file-control">Choose file</span>
            </label>
          </div>
        </div>
      </div>
    );
  }

  editProfile() {
    if(this.state.edit === 'edit') {
      const edit = document.getElementById('edit');
      const profile = document.getElementById('profile');
      const messages = document.getElementById('messages');
      const editLink = document.getElementById('navLinkEdit');
      const profileLink = document.getElementById('navLinkProfile');
      const messagesLink = document.getElementById('navLinkMessages');
      profile.className = "tab-pane";
      messages.className = "tab-pane";
      edit.className = "tab-pane active show";
      profileLink.className = "nav-link";
      messagesLink.className = "nav-link";
      editLink.className = "nav-link active show";
    }
  }
}
