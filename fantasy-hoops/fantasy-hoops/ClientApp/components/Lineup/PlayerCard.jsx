import React, { Component } from 'react';

export class PlayerCard extends Component {
  constructor() {
    super();
    this.filter = this.filter.bind(this);
    this.select = this.select.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  render() {
    if (this.props.status > 0) {
      const pos = this.props.player.position.toLowerCase();
      let photo = '';
      try {
        photo = require(`../../content/images/players/${this.props.player.id}.png`)
      }
      catch (err) {
        photo = require(`../../content/images/${pos}.png`);
      }
      const innerHTML = this.props.player.selected
        ? <a className="glyphicon glyphicon-remove"></a>
        : <a className="glyphicon glyphicon-plus"></a>;
      const buttonState = this.props.status == 1
        ? <div className="button">
          <button className={`btn btn-circle btn-lg ${this.props.player.selected ? 'btn-danger' : 'btn-primary'} text-center`}
            onClick={this.select}>
            {innerHTML}
          </button>
        </div>
        : '';
      return (
        <div onClick={this.props.status == 2 ? this.filter : ''} className="card">
          <div className="ppg">{this.props.player.fppg.toFixed(1)}</div>
          <div className="ppg ppg-label">PPG</div>
          <div className="player-position">{this.props.player.position}</div>
          {buttonState}
          <div className="price-badge">
            <span className="badge badge-dark">{this.props.player.price + 'K'}</span>
          </div>
          <img
            className="card-img-top"
            style={{ backgroundColor: `${this.props.player.teamColor}` }}
            src={photo}
            alt="Card image cap">
          </img>
          <div className="card-block" >
            <h2 className="card-title">{this.getDisplayName(this.props.player)}</h2>
          </div>
        </div>
      );
    }
    else {
      const photos = {
        PG: require('../../content/images/pg.png'),
        SG: require('../../content/images/sg.png'),
        SF: require('../../content/images/sf.png'),
        PF: require('../../content/images/pf.png'),
        C: require('../../content/images/c.png')
      }
      return (
        <div onClick={this.filter} className="card" tabIndex="1">
          <img className="card-img-top"
            style={{ backgroundColor: `` }}
            src={photos[this.props.position]}
            alt={this.props.position}>
          </img>
          <div className="card-block" >
            <h2 className="card-title">{this.props.position}</h2>
          </div>
        </div>
      );
    }
  }

  getDisplayName(player) {
    if(!player)
      return;

    if(player.firstName.length > 1)
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

  filter() {
    this.props.filter(this.props.position);
  }

  handleSelect() {
    this.props.handleSelect(this.props.player.id, this.props.player.position);
  }
}
