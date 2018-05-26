import React, { Component } from 'react';
import { Input } from '../Inputs/Input';
import { Select } from '../Inputs/Select';
import { handleErrors } from '../../utils/errors'
import { Alert } from '../Alert';
import { isAuth } from '../../utils/auth';

export class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      showAlert: false,
      alertType: '',
      alertText: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });

    const btn = document.getElementById('submit');
    if (document.querySelectorAll('.is-invalid').length != 0) {
      btn.className = 'btn btn-outline-primary btn-block';
      btn.disabled = true;
      return;
    }
    else {
      const forms = document.querySelectorAll('.form-control');
      for (let i = 0; i < forms.length; i++) {
        if (!forms[i].required)
          continue;
        if (forms[i].value.length === 0) {
          btn.className = 'btn btn-outline-primary btn-block';
          btn.disabled = true;
          return;
        }
      }
    }
    btn.className = 'btn btn-primary btn-block';
    btn.disabled = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      UserName: this.state.username,
      Email: this.state.email,
      Password: this.state.password
    };

    fetch('/api/user/register', {
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
          alertText: err.message.substring(4)
        });
      });
  }

  componentDidMount() {
    // If user has signed in already, he is redirecting to main page
    if (isAuth()) {
      window.location.replace("/");
    }
  }

  render() {
    return (
      <div className="container pb-3 bg-light vertical-center" style={{ maxWidth: '420px' }}>
        <br />
        <h2>Registration</h2>
        <hr />
        <Alert type={this.state.alertType} text={this.state.alertText} show={this.state.showAlert} />
        <form onSubmit={this.handleSubmit} id="form">
          <div className="form-group">
            <label>Username</label>
            <Input
              type="text"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
              regex={/^.{4,11}$/}
              error="Username must be between 4 and 11 symbols long"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <Input
              type="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              regex={/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i}
              error="Invalid email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <Input
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
              regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/}
              error="Password must contain: 8-20 characters. At least one uppercase letter. At least one number."
              children="confirmPassword"
            />
          </div>
          <div className="form-group">
            <label>Confirm password</label>
            <Input
              type="password"
              id="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              match="password"
              error="Passwords must match"
            />
          </div>
          <button id="submit" disabled className="btn btn-outline-primary btn-block">Submit</button>
        </form>
        <div className="mt-1">
          <small style={{ color: 'hsl(0, 0%, 45%)' }}>
            Already on Fantasy Hoops?
            <a href="/login"> Sign In</a>
          </small>
        </div>
      </div>
    );
  }


}
