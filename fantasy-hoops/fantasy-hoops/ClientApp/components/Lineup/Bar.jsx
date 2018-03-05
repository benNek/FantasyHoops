import React, { Component } from 'react';
const budget = 300; // thousands

export class Bar extends Component {
  render() {
    const params = this.updateProgressBar();
    return (
      <div className="progress-bar" role="progressbar"
        style={{
          backgroundColor: params.color,
          width: `${params.width}%`
        }}>
      </div>
    );
  }

  updateProgressBar() {
    const player = this.props.player;
    const color = player.props.status == 2 ? player.props.player.teamColor : color;
    const width = (player.props.status == 2 ? parseInt(player.props.player.price.replace('K', '')) : 0) / budget * 100;
    return {color, width};
  }
}
