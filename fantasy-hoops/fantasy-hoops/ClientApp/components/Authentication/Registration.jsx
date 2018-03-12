import React, { Component } from 'react';
import { Input } from '../Inputs/Input';
import { Select } from '../Inputs/Select';


export class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      team: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });

    const btn = document.getElementById('submit'); 
    if(document.querySelectorAll('.is-invalid').length != 0) {
      btn.className = 'btn btn-outline-primary btn-block';
      btn.disabled = true;
      return;
    }
    else {
      const forms = document.querySelectorAll('.form-control');
      for(let i = 0; i < forms.length; i++) {
        if(!forms[i].required)
          continue;
        if(forms[i].value.length === 0) {
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
    alert('REGISTRATION SUCCESSFUL!');
  }

  render() {
    let teams = [
      {
        value: 1,
        name: "Atlanta Hawks"
      },
      {
        value: 2,
        name: "Boston Celtics"
      },
      {
        value: 3,
        name: "Los Angeles Lakers"
      },
      {
        value: 4,
        name: "San Antonio Spurs"
      }
    ];

    return (
      <div className="container mt-5 pb-3 bg-light vertical-center" style={{'maxWidth': '420px'}}>
        <br />
        <h2>Registration</h2>
        <form onSubmit={this.handleSubmit} id="form">
          <div required className="form-group">
            <label>Username</label>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
              regex={/^.{4,11}$/}
              error="Username must be between 4 and 11 symbols long"
            />
          </div>
          <div className="form-group">
            <label>Enter email</label>
            <Input
              type="email"
              id="email"
              placeholder="Enter email"
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
              placeholder="Password"
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
              placeholder="Password"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              match="password"
              error="Passwords must match"
            />
          </div>
          <div className="form-group">
            <label>Phone number (Not required)</label>
            <Input
              type="text"
              id="phone"
              placeholder="Phone number"
              value={this.state.phone}
              onChange={this.handleChange}
              regex={/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/}
              error="Invalid phone number"
              notRequired={true}
            />
          </div>
          <div className="form-group">
            <label>Select your avatar (Not required)</label>
            <Input
              type="file"
              id="avatar"
              placeholder=""
              notRequired={true}
            />
          </div>
          <div className="form-group">
            <label>Favorite team (Not required)</label>
            <Select
              options={teams}
              id="team"
              value={this.state.team}
              onChange={this.handleChange}
              notRequired={true}
            />
          </div>
          <button id="submit" disabled className="btn btn-outline-primary btn-block">Submit</button>
        </form>
      </div>
    );
  }


}
