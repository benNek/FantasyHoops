import React, { Component } from 'react';
import { NewsCard } from './NewsCard';
import _ from 'lodash'
import shortid from 'shortid';

export class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: ''
    }
  }

  componentDidMount() {
    fetch(`http://localhost:51407/api/news`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          news: res
        });
      });
  }

  render() {
    let news = _.map(this.state.news,
      (news) => {
        return <NewsCard key={shortid()} news={news} />
      }
    );
    return (
      <div className="container bg-light pt-5 pb-1">
        <div className="center col">
          {news}
        </div>
      </div>
    );
  }
}
