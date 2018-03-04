import React, { Component } from 'react';
const budget = 300; // thousands

export class Bar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updated: false,
      color: '',
      width: ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.updated)
      this.updateProgressBar();
  }

  render() {
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
    this.setState({
      updated: !this.state.updated,
      color: player.props.status == 2 ? player.props.player.teamColor : this.state.color,
      width: (player.props.status == 2 ? parseInt(player.props.player.price.replace('K', '')) : 0) / budget * 100
    });
  }
}
