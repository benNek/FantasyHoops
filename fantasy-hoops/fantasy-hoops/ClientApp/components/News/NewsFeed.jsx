import React, { Component } from 'react';
import { NewsCard } from './NewsCard';
import _ from 'lodash'
import shortid from 'shortid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '../Loader';
import defaultLogo from '../../content/images/defaultLogo.png';

export class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: '',
      hasMore: true,
      newsLoader: false,
      logoIMG: this.getImages()
    }
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.setState({
      newsLoader: true
    });
    fetch(`http://localhost:51407/api/news`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          news: res,
          newsLoader: false
        });
      });
  }

  fetchData() {
    this.setState({
      newsLoader: true
    });
    fetch(`http://localhost:51407/api/news?start=${this.state.news.length}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          news: this.state.news.concat(res),
          hasMore: res.length == 6,
          newsLoader: false
        });
      });
  }

  getImages() {
    try {
      return this.importAll(require.context('../../content/images/logos', false, /\.(png|jpe?g|svg)$/))
    }
    catch (err) {
      return ''
    }
  }

  importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  render() {
    let news = _.map(this.state.news,
      (news) => {
        return <NewsCard
          hTeam={this.state.logoIMG[`${news.hTeam}.svg`] || defaultLogo}
          vTeam={this.state.logoIMG[`${news.vTeam}.svg`] || defaultLogo}
          key={shortid()}
          news={news} />
      }
    );
    return (
      <div className="container bg-light pt-4 pb-1">
        <div className="center col">
          <InfiniteScroll
            dataLength={news.length}
            next={this.fetchData}
            hasMore={this.state.hasMore}
            loader={<Loader show={this.state.newsLoader} />}
          >
            {news}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}
