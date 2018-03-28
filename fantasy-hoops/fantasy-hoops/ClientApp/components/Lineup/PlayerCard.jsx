import React, { Component } from 'react';
import Scroll from 'react-scroll';

export class PlayerCard extends Component {
  constructor() {
    super();
    this.filter = this.filter.bind(this);
    this.select = this.select.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  render() {
    if (this.props.status > 0) {
      const pos = this.props.player.position.toLowerCase();
      const innerHTML = this.props.player.selected
        ? <a className="fa fa-remove"></a>
        : <i className="fa fa-plus"></i>;
      const buttonState = this.props.status == 1
        ? <div className="button">
          <button className={`btn-no-outline center btn-circle btn-lg ${this.props.player.selected ? 'btn-danger' : 'btn-primary'} text-center`}
            onClick={this.select}>
            {innerHTML}
          </button>
        </div>
        : '';
      return (
        <div>
          <div className="player-card card">
            {this.props.status == 1 ? <div className="ppg">{this.props.player.fppg.toFixed(1)}</div> : ''}
            {this.props.status == 1 ? <div className="ppg ppg-label">FPPG</div> : ''}
            {this.props.status == 1 ? <div className="player-position">{this.props.player.position}</div> : ''}
            {buttonState}
            <div className="price-badge">
              <span className="badge badge-dark">{this.props.player.price + 'K'}</span>
            </div>
            <img
              onClick={this.props.status == 2 ? this.filter : ''}
              className="player-card-img-top card-img-top"
              style={{ backgroundColor: `${this.props.player.teamColor}` }}
              src={this.props.image}
              alt={this.getDisplayName(this.props.player)}>
            </img>
            <div className="card-block" >
              <h2
                data-toggle="modal"
                data-target="#playerModal"
                className="player-card-title card-title"
                onClick={this.showModal}
                style={{ cursor: 'pointer' }}
              >
                {this.getDisplayName(this.props.player)}
              </h2>
            </div>
          </div>
        </div>
      );
    }
    else {
      const pos = this.props.position.toLowerCase();
      return (
        <div onClick={this.filter} className="player-card card" tabIndex="1">
          <img className="player-card-img-top card-img-top"
            style={{ backgroundColor: `` }}
            src={this.props.image}
            alt={this.props.position}>
          </img>
          <div className="card-block" >
            <h2 className="player-card-title card-title">{this.props.position}</h2>
          </div>
        </div>
      );
    }
  }

  getDisplayName(player) {
    if (!player)
      return;
    if (player.firstName.length > 1)
      return `${player.firstName[0]}. ${player.lastName}`;
    else
      return player.lastName;
  }

  select() {
    this.props.player.selected = !this.props.player.selected;
    this.props.player.status = this.props.player.selected ? 2 : 1;
    this.props.selectPlayer(this.props.player);
    this.handleSelect();
  }

  showModal() {
    this.props.showModal(this.props.player);
  }

  filter() {
    Scroll.animateScroll.scrollToTop();
    this.props.filter(this.props.position);
  }

  handleSelect() {
    this.props.handleSelect(this.props.player.id, this.props.player.position);
  }
}
