import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import PlayerAPI from '../mocked/players';

export class PlayerCard extends Component {
  constructor() {
    super();
    this.state = { selected: false };
    this.select = this.select.bind(this);
  }

  render() {
    if (!this.props.isUnknown) {
      const innerHTML = this.state.selected ? <a className="glyphicon glyphicon-remove"></a> : <a className="glyphicon glyphicon-plus"></a>;
      return (
        <div className="card">
          <div className="ppg">{this.props.player.ppg}</div>
          <div className="ppg ppg-label">PPG</div>
          <div className="player-position">{this.props.player.position}</div>
          <div className="button">
            <button className={`btn btn-circle btn-lg ${this.state.selected ? 'btn-danger' : 'btn-primary'} text-center`}
              onClick={() => { this.select() }}>
              {innerHTML}
            </button></div>
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
      let photos = {
        PG: require('../content/images/pg.png'),
        SG: require('../content/images/sg.png'),
        SF: require('../content/images/sf.png'),
        PF: require('../content/images/pf.png'),
        C: require('../content/images/c.png')
      }
      return (
        <div className="card">
          <img className="card-img-top" style={{ backgroundColor: `` }} src={photos[this.props.position]} alt={this.props.position}></img>
          <div className="card-block" >
            <h2 className="card-title">{this.props.position}</h2>
          </div>
        </div>
      );
    }
  }

  select() {
    if (!this.state.selected) {
      this.props.selectPlayer(this.props.player);
    }
    this.setState({
      selected: !this.state.selected
    });
  }
}
