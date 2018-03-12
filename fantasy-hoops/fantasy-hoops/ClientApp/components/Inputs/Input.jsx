import React, { Component } from 'react';

export class Input extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    const regex = new RegExp(this.props.regex);
    if (!regex.test(value))
      e.target.className = "form-control is-invalid";
    else
      e.target.className = "form-control";

    if(this.props.match) {
      const passwordValue = document.getElementById(this.props.match).value;
      if(passwordValue !== value)
        e.target.className = "form-control is-invalid";
      else
        e.target.className = "form-control";
    }

    if(this.props.children) {
      const passwordValue = document.getElementById(this.props.children).value;
      if(passwordValue.length > 0) {
        if(value !== passwordValue) {
          document.getElementById(this.props.children).className = "form-control is-invalid";
        }
        else {
          document.getElementById(this.props.children).className = "form-control";
        }
      }
    }
    this.props.onChange(e);
  }

  render() {
    return (
      <div>
        <input
          type={this.props.type}
          className="form-control"
          id={this.props.id}
          maxLength="40"
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.handleChange}
          required={this.props.notRequired ? false : true}
        />
        <div className="invalid-feedback">
          {this.props.error}
        </div>
      </div>
    );
  }
}