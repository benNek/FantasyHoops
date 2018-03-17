import React, { Component } from 'react';

export class InjuryCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const pos = this.props.injury.player.position.toLowerCase();
    let photo = '';
    try {
      photo = require(`../../content/images/players/${this.props.injury.player.nbaID}.png`)
    }
    catch (err) {
      photo = require(`../../content/images/${pos}.png`);
    }
    let status = '';
    if (this.props.injury.status.toLowerCase().includes("active"))
      status = 'injury-active';
    else if (this.props.injury.status.toLowerCase().includes("out")
      || this.props.injury.status.toLowerCase().includes("injured"))
      status = 'injury-out';
    else
      status = 'injury-questionable';

    return (
      <div className='ml-3 mt-3'>
        <div className='column'>
          <div className='post-module'>
            <div className='thumbnail'>
              <div className='date'>
                <div className='day badge badge-dark'>{this.props.injury.player.position}</div>
              </div>
              <img src={photo}
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
                <span className='comments'>
                  <i className='fa fa-comments'></i>
                  <a target="_blank" href={this.props.injury.link}>Read more</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
