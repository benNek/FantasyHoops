import React, { Component } from 'react';

export class InjuryCard extends Component {
  constructor() {
    super();
    this.importAll = this.importAll.bind(this);
  }

  render() {
    let posIMG = '';
    let playerIMG = '';
    try {
      posIMG = this.importAll(require.context('../../content/images/', false, /\.(png|jpe?g|svg)$/));
      playerIMG = this.importAll(require.context('../../content/images/players', false, /\.(png|jpe?g|svg)$/));
    }
    catch (err) {
    }
    let status = '';
    if (this.props.injury.status.toLowerCase().includes("active"))
      status = 'injury-active';
    else if (this.props.injury.status.toLowerCase().includes("out")
      || this.props.injury.status.toLowerCase().includes("injured"))
      status = 'injury-out';
    else
      status = 'injury-questionable';
    const link = this.props.injury.link != ''
      ? (<span className='comments'>
        <i className='fa fa-comments'></i>
        <a target="_blank" href={this.props.injury.link}>Read more</a>
      </span>)
      : '';
    const pos = this.props.injury.player.position.toLowerCase();
    return (
      <div className='ml-3 mt-3'>
        <div className='column'>
          <div className='post-module'>
            <div className='thumbnail'>
              <div className='date'>
                <div className='day badge badge-dark'>{this.props.injury.player.position}</div>
              </div>
              <img src={playerIMG[`${this.props.injury.player.nbaID}.png`] || posIMG[`${pos}.png`]}
                style={{ backgroundColor: this.props.injury.player.team.color }} />
            </div>
            <div className='post-content'>
              <div className={'category ' + status}>{this.props.injury.status}</div>
              <h1 className='title'>{this.props.injury.player.firstName[0]}. {this.props.injury.player.lastName}</h1>
              <h2 className='sub_title line-clamp'>{this.props.injury.title}</h2>
              <p className='description'>{this.props.injury.description}</p>
              <div className='post-meta'>
                <span className='timestamp'>
                  <i className='fa fa-clock-o'></i>
                  {this.props.injury.date}
                </span>
                {link}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
}
