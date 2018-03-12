import React, { Component } from 'react';
import { Input } from '../Inputs/Input';


export class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      width: ''
    }
  }

  render() {
    return (
      <div className="container mt-5 bg-light text-center">
        <br />
        <h1>Register</h1>
        <form>
          <div className="form-group">
            <label for="username">Username</label>
            <Input
              type="text"
              id="username"
              placeholder="Username" />
          </div>
          <div className="form-group">
            <label for="email">Enter email</label>
            <Input
              type="email"
              id="email"
              placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <Input
              type="password"
              id="password"
              placeholder="Password" />
          </div>
          <div className="form-group">
            <label for="confirmPassword">Confirm password</label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Password" />
          </div>
          <div className="form-group">
            <label for="phone">Phone number (Not required)</label>
            <Input
              type="text"
              id="phone"
              placeholder="Phone number" />
          </div>
          <div className="form-group">
            <label for="avatar">Select your avatar (Not required)</label>
            <Input
              type="file"
              id="avatar"
              placeholder="" />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }


}
