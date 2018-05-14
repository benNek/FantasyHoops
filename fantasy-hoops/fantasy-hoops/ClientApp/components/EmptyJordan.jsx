import React, { Component } from 'react';

export class EmptyJordan extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="text-center m-5">
        <img className="text-center" src={require('../content/images/jordan-crying.png')} style={{ height: '12.5rem' }} />
        <h5>{this.props.message}</h5>
      </div>
    );
  }
}
