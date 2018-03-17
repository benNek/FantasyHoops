import React, { Component } from 'react';

export class Alert extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`alert ${this.props.type} alert-dismissible fade show`} role="alert">
        {this.props.text}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}