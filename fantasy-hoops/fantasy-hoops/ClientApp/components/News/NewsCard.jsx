import React, { Component } from 'react';
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

      <div className="mt-5 mb-5 mx-auto news-card card">
        <div className="card-header bg-info"><h5 className="card-title">{this.props.news.title}</h5></div>
        <div className="card-body news-title">
          <div>
            <input onChange={this.handleCheck} checked={this.state.checked} type="checkbox" className="read-more-state" id={this.props.news.id} />
            <p className="read-more-wrap">{text.substring(0, cutPosition)}{!this.state.checked ? '...' : ''}<span className="read-more-target">{text.substring(cutPosition, text.length)}</span></p>
            <label htmlFor={this.props.news.id} className="read-more-trigger"></label>
          </div>
        </div>
        <div className="card-footer text-muted mt-2">
          {this.props.news.date}</div>
      </div>
    );
  }
  handleCheck() {
    this.setState({
      checked: !this.state.checked
    });
  }
}