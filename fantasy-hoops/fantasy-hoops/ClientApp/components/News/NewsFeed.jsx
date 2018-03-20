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
      <div className="container bg-light pt-5 pb-1">
        <div className="center col">
          {news}
        </div>
      </div>
    );
  }
}
