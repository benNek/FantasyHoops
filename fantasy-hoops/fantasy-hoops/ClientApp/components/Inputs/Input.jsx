import React, { Component } from 'react';

export class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      width: ''
    }
  }

  render() {
    return (
      <div>
        <input type={this.props.type} className="form-control" id={this.props.id} placeholder={this.props.placeholder} />
      </div>
    );
  }
}