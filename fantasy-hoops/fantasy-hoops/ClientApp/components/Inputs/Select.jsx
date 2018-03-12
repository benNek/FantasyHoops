import React, { Component } from 'react';
import shortid from 'shortid';

export class Select extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
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