import React, { Component } from 'react';
const budget = 300000;

export class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      width: ''
    }
  }

  render() {
    this.updateProgressBar();
    return (
      <div className="progress-bar" role="progressbar"
        style={{
          backgroundColor: this.state.color,
          width: `${this.state.width}%`
        }}>
      </div>
    );
  }

  updateProgressBar() {
    const player = this.props.player;
    this.state.color = player.props.status == 2 ? player.props.player.teamColor : this.state.color;
    this.state.width = (player.props.status == 2 ? player.props.player.price : 0) / budget * 100;
  }
}
