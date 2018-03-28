import React, { Component } from 'react';
import { NewsCard } from './NewsCard';
import _ from 'lodash'
import shortid from 'shortid';
import InfiniteScroll from 'react-infinite-scroll-component';

export class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: '',
      hasMore: true,
    }
    this.fetchData = this.fetchData.bind(this);
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

  fetchData() {
    fetch(`http://localhost:51407/api/news?start=${this.state.news.length}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          news: this.state.news.concat(res),
          hasMore: res.length == 6
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
          <InfiniteScroll
            dataLength={news.length}
            next={this.fetchData}
            hasMore={this.state.hasMore}
            loader={<h4>Loading...</h4>}
            >
            {news}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}
