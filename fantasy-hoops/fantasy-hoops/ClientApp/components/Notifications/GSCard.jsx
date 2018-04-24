import React, { Component } from 'react';

export class GSCard extends Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);

    this.state = {
    }
  }

  select() {
    this.props.toggleNotification(this.props.notification);
  }

  render() {
    return <a
      onClick={this.select}
      className="dropdown-item cursor-default"
    >
      Game has finished! Your lineup scored {this.props.notification.score} FP
    </a>;
  }
}
