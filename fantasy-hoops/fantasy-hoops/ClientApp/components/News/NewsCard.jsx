import React, { Component } from 'react';
import Scroll from 'react-scroll'

export class NewsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
    this.handleCheck = this.handleCheck.bind(this);
  }

  render() {
    const text = this.props.news.news;
    const cutPosition = 300;
    return (
      <div className="mt-5 mx-auto news-card card">
        <div className="card-header bg-info text-white">
          <h5 className="card-title" style={{ marginBottom: '0' }}>
            {this.props.news.title}
          </h5>
        </div>
        <span>
          <img
            src="http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/PHI.svg"
            alt=""
            width="50px"
            style={{ position: 'absolute' }}
          />
        </span>
        <span style={{ paddingLeft: '4rem' }}>
          <img
            src="http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/CHA.svg"
            alt=""
            width="50px"
            style={{ position: 'absolute' }}
          />
        </span>
        <div className="card-header text-muted" style={{ height: '3rem', paddingLeft: '3rem' }}>
          vs.
          <span style={{ float: 'right' }}>
            {this.props.news.date}
          </span>
        </div>
        <div className="card-body">
          <input
            onChange={this.handleCheck}
            checked={this.state.checked}
            type="checkbox"
            className="read-more-state"
            id={this.props.news.id}
          />
          <p className="read-more-wrap" style={{ textAlign: 'justify' }}>{text.substring(0, cutPosition)}
            {!this.state.checked ? '...' : ''}
            <span className="read-more-target">
              {text.substring(cutPosition, text.length)}
            </span>
          </p>
          <label htmlFor={this.props.news.id} className="read-more-trigger"></label>
        </div>
      </div>
    );
  }

  handleCheck(e) {
    if (this.state.checked) {
      var div = e.target.parentElement.parentElement;
      Scroll.animateScroll.scrollMore(div.getBoundingClientRect().top - 80);
      console.log(div.getBoundingClientRect().top);
    }
    this.setState({
      checked: !this.state.checked
    });
  }
}