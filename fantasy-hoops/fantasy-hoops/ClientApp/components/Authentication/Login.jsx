import React, { Component } from 'react';
import { Input } from '../Inputs/Input';


export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.testAuth = this.testAuth.bind(this);
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
      .then(res => res.json())
      .then(res => {
        localStorage.setItem('accessToken', JSON.stringify(res.token));
        console.log('Login successful!');
      })
      .catch(err => console.error(err));
  }

  testAuth(e) {
    e.preventDefault();
    fetch('/api/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
      }
    })
      .catch(err => console.error('UNAUTHORIZED'))
      .then(res => res.text())
      .then(res => console.log(res));
  }

  render() {
    return (
      <div className="container mt-5 pb-3 bg-light vertical-center" style={{ 'maxWidth': '420px' }}>
        <br />
        <h2>Login</h2>
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
          <a href="/register" className="btn btn-outline-info btn-block">Sign up</a>
          <a href="#" onClick={this.testAuth} className="btn btn-danger btn-block">Test AUTH</a>
        </form>
      </div>
    );
  }


}
