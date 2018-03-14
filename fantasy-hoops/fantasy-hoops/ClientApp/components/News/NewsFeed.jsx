import React, { Component } from 'react';
import { NewsCard } from './NewsCard';
import NewsAPI from '../../mocked/News';
import _ from 'lodash'
import shortid from 'shortid';

export class NewsFeed extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const news = _.map(NewsAPI.all(),
      (news) => {
        return <NewsCard key={shortid()} news={news} />
      }
    );
    return (
      <div className="container mt-4 bg-light" style={{ paddingTop: '3em' }}>
        <div className="center col">
          {news}
        </div>
      </div>
    );
  }
}
