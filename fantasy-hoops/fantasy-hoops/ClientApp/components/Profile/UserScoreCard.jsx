import React, { Component } from 'react';

export class UserScoreCard extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    $(document).ready(function () {
      $('[data-toggle=tooltip]').tooltip({ trigger: "hover" });
    });
  }

  showModal() {
    $('[data-toggle="tooltip"]').tooltip("hide");
    this.props.showModal(this.props.player);
  }

  render() {
    return (
      <a
        data-toggle="tooltip"
        data-placement="top"
        title="Click for stats"
      >
        <div
          data-toggle="modal"
          data-target="#playerModal"
          onClick={this.showModal}
          style={{ overflow: 'hidden', cursor: 'default' }}>
          <div className="card-circle" style={{ backgroundColor: this.props.player.color }}
          >
            <img
              className="user-card-player"
              src={this.props.image}
            />
          </div>
          <p className="player-usertitle">{this.props.player.lastName}</p>
          <p className="player-score">{this.props.player.fp}</p>
        </div>
      </a>
    );
  }
}