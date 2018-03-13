import React, { Component } from 'react';
import { NewsCard } from './NewsCard';
import NewsAPI from '../../mocked/News';
import _ from 'lodash'

export class NewsFeed extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const news = _.map(NewsAPI.all(),
      (news) => {
        return <NewsCard news={news} />
      }
    );
    return (
      <div className="container mt-4 bg-light" style={{ paddingTop: '1.8em' }}>
        <div className="row">
          {news}
        </div>   
      </div>
    );
  }
}
