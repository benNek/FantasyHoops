import React, { Component } from 'react';
import { Input } from '../Inputs/Input';
import { handleErrors } from '../../utils/errors'
import { Alert } from '../Alert';
import { isAuth } from '../../utils/auth';

export class Login extends Component {
  constructor(props) {
    super(props);

    const error = this.props.location.state && this.props.location.state.error;

    this.state = {
      username: '',
      password: '',
      showAlert: error ? true : false,
      alertType: error ? 'alert-danger' : '',
      alertText: error ? this.props.location.state.error : ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });

    const btn = document.getElementById('login');
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
      Password: this.state.password
    };

    fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => handleErrors(res))
      .then(res => res.json())
      .then(res => {
        localStorage.setItem('accessToken', res.token);

        // If user was redirected to login because of authentication errors,
        // he is now being redirected back
        if (this.props.location.state && this.props.location.state.fallback) {
          window.location.replace("/lineup");
          return;
        }
        window.location.replace("/");
      })
      .catch(err => {
        this.setState({
          showAlert: true,
          alertType: 'alert-danger',
          alertText: err.message
        })
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
        <h2>Login</h2>
        <hr />
        <Alert type={this.state.alertType} text={this.state.alertText} show={this.state.showAlert} />
        <form onSubmit={this.handleSubmit} id="form">
          <div className="form-group">
            <label>Username</label>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button id="login" disabled className="btn btn-outline-primary btn-block">Log in</button>
          <a href="/register" className="btn btn-info btn-block">Sign up</a>
        </form>
      </div>
    );
  }
}
