import React, { Component } from 'react';

export class InjuryCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const pos = this.props.player.position.toLowerCase();
    let photo = '';
    try {
      photo = require(`../../content/images/players/${this.props.player.id}.png`)
    }
    catch (err) {
      photo = require(`../../content/images/${pos}.png`);
    }
    let status = '';
    if (this.props.player.status === "Active")
      status = 'injury-active';
    else if (this.props.player.status === "Out")
      status = 'injury-out';
    else
      status = 'injury-questionable';

    return (
      <div className='ml-3 mt-3'>
        <div className='column'>
          <div className='post-module'>
            <div className='thumbnail'>
              <div className='date'>
                <div className='day badge badge-dark'>{this.props.player.position}</div>
              </div>
              <img src={photo}
                style={{ backgroundColor: this.props.player.teamColor }} />
            </div>
            <div className='post-content'>
              <div className={'category '+status}>{this.props.player.status}</div>
              <h1 className='title'>{this.props.player.name[0]}. {this.props.player.surname}</h1>
              <h2 className='sub_title'>{this.props.player.subTitle}</h2>
              <p className='description'>{this.props.player.news}</p>
              <div className='post-meta'>
                <span className='timestamp'>
                  <i className='fa fa-clock-o'></i>
                  {this.props.player.date}
                </span>
                <span className='comments'>
                  <i className='fa fa-comments'></i>
                  <a href={this.props.player.link}>Read more</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
