import React, { Component } from 'react';

export class Alert extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let style = this.props.show ? {display: 'block'} : {display: 'none'};
    return (
      <div className={`alert ${this.props.type}`} style={style} role="alert">
        {this.props.text}
      </div>
    );
  }
}