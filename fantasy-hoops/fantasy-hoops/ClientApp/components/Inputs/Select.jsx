import React, { Component } from 'react';
import shortid from 'shortid';

export class Select extends Component {
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

    if (this.props.match) {
      const passwordValue = document.getElementById(this.props.match).value;
      if (passwordValue !== value)
        e.target.className = "form-control is-invalid";
      else
        e.target.className = "form-control";
    }

    if (this.props.children) {
      const passwordValue = document.getElementById(this.props.children).value;
      if (passwordValue.length > 0) {
        if (value !== passwordValue) {
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
    let values = this.props.options.map(option => {
      return (
        <option key={shortid()} value={option.value}>{option.name}</option>
      );
    });
    return (
      <div>
        <select
          id={this.props.id}
          className="form-control custom-select"
          value={this.props.value}
          onChange={this.props.onChange}
          required={this.props.notRequired ? false : true}
        >
          <option value="" defaultValue>Choose your favourite team</option>
          {values}
        </select>
        <div className="invalid-feedback">
          {this.props.error}
        </div>
      </div>
    );
  }
}