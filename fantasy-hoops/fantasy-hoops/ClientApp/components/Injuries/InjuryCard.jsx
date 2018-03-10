import React, { Component } from 'react';

export class InjuryCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='injury-container ml-3 mt-3'>
        <div className='column'>
          <div className='post-module'>
            <div className='thumbnail'>
              <div className='date'>
                <div className='day'>{this.props.player.position}</div>
              </div>
              <img src={require(`../../content/images/players/${this.props.player.id}.png`)} style={{ backgroundColor: this.props.player.teamColor }} />
            </div>
            <div className='post-content'>
              <div className='category'>{this.props.player.status}</div>
              <h1 className='title'>{this.props.player.name} {this.props.player.surname}</h1>
              <h2 className='sub_title'>{this.props.player.subTitle}</h2>
              <p className='description'>{this.props.player.news}</p>
              <div className='post-meta'>
                <span className='timestamp'>
                  <i className='fa fa-clock-o'></i>
                  6 mins ago
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
