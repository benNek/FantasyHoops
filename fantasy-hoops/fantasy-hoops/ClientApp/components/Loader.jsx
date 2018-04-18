import React, { Component } from 'react';
import loader from '../content/images/loader.gif'

export class Loader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let style = this.props.show ? {display: 'block'} : {display: 'none'};
    return (
      <div className='col text-center' style={style}>
        <img src={loader} alt="loading..." />
      </div>
    );
  }
}