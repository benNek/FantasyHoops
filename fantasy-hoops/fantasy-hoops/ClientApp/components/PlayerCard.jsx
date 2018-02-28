﻿import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';

export class PlayerCard extends Component {
  constructor() {
    super();
    this.state = {
      status: 0
    }
    this.filter = this.filter.bind(this);
    this.select = this.select.bind(this);
  }

  render() {
    if (this.props.status > 0) {
      const innerHTML = this.props.player.selected
        ? <a className="glyphicon glyphicon-remove"></a>
        : <a className="glyphicon glyphicon-plus"></a>;
      const buttonState = this.props.status == 2
        ? <div></div>
        : <div className="button">
          <button className={`btn btn-circle btn-lg ${this.props.player.selected ? 'btn-danger' : 'btn-primary'} text-center`}
            onClick={() => { this.select() }}>
            {innerHTML}
          </button>
        </div>;
      return (
        <div onClick={this.props.status == 2 ? this.filter : ''} className="card">
          <div className="ppg">{this.props.player.ppg}</div>
          <div className="ppg ppg-label">PPG</div>
          <div className="player-position">{this.props.player.position}</div>
          {buttonState}
          <div className="price-badge">
            <span className="badge badge-dark">{this.props.player.price}</span>
          </div>
          <img className="card-img-top" style={{ backgroundColor: `${this.props.player.teamColor}` }} src={this.props.player.img} alt="Card image cap"></img>
          <div className="card-block" >
            <h2 className="card-title">{this.props.player.name[0]}. {this.props.player.surname}</h2>
          </div>
        </div>
      );
    }
    else {
      const photos = {
        PG: require('../content/images/pg.png'),
        SG: require('../content/images/sg.png'),
        SF: require('../content/images/sf.png'),
        PF: require('../content/images/pf.png'),
        C: require('../content/images/c.png')
      }
      return (
        <div onClick={this.filter} className="card">
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

  select() {
    this.props.player.selected = !this.props.player.selected;
    this.props.selectPlayer(this.props.player, this.props.status);
  }

  filter() {
    this.props.filter(this.props.position);
  }
}