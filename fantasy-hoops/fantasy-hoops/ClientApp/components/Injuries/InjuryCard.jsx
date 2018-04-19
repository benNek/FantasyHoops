import React, { Component } from 'react';
import moment from 'moment';

export class InjuryCard extends Component {
  constructor() {
    super();
  }

  getDate() {
    const date = new Date(this.props.injury.date);
    const serverTime = new Date(this.props.serverTime);
    const diff = Math.abs(serverTime.getTimezoneOffset()) / 60;
    return date.setHours(date.getHours() + diff);
  }

  render() {
    let status = '';
    if (this.props.injury.status.toLowerCase().includes("active"))
      status = 'injury-active';
    else if (this.props.injury.status.toLowerCase().includes("out")
      || this.props.injury.status.toLowerCase().includes("injured"))
      status = 'injury-out';
    else
      status = 'injury-questionable';
    const link = this.props.injury.link != ''
      ? (<span style={{ float: 'left' }} className='comments'>
        <i className='fa fa-comments'></i>
        <a target="_blank" href={this.props.injury.link}> Read more </a>
      </span>)
      : '';
    const pos = this.props.injury.player.position.toLowerCase();
    return (
      <div className='mx-auto' style={{ transform: 'scale(0.9, 0.9)' }}>
        <div className='column'>
          <div className='post-module'>
            <div className='thumbnail'>
              <div className='date'>
                <div className='day badge badge-dark'>{this.props.injury.player.position}</div>
              </div>
              <img src={this.props.image}
                style={{ backgroundColor: this.props.injury.player.team.color }} />
            </div>
            <div className='post-content'>
              <div className={'category ' + status}>{this.props.injury.status}</div>
              <h1 className='title'>{this.props.injury.player.firstName[0]}. {this.props.injury.player.lastName}</h1>
              <h2 className='sub_title line-clamp'>{this.props.injury.title}</h2>
              <p className='description'>{this.props.injury.description}</p>
              <div className='post-meta'>
                {link}
                <span style={{ float: 'right' }} className='timestamp'>
                  <i className='fa fa-clock-o'></i> {moment(this.getDate()).fromNow()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
