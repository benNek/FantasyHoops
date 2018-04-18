import React, { Component } from 'react';
import { InjuryCard } from './InjuryCard';
import _ from 'lodash'
import shortid from 'shortid';
import { Loader } from '../Loader';

export class InjuriesFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noInjuries: false,
      injuries: '',
      playerIMG: this.importAll(require.context('../../content/images/players', false, /\.(png|jpe?g|svg)$/)),
      posIMG: this.importAll(require.context('../../content/images/', false, /\.(png|jpe?g|svg)$/)),
      injuryLoader: false,
    }
  }

  componentDidMount() {
    fetch(`http://localhost:51407/api/lineup/nextGame`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          serverTime: res.serverTime
        });
      })
    fetch(`http://localhost:51407/api/injuries`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          injuries: res,
          noInjuries: false,
          injuryLoader: false
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.injuries !== this.state.injuries
      && this.state.injuries.length == 0)
      this.setState({
        noInjuries: true
      });
  }

  importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  render() {
    let injuries = _.map(this.state.injuries,
      (injury) => {
        const pos = injury.player.position.toLowerCase();
        return <InjuryCard
          serverTime={this.state.serverTime}
          key={shortid()}
          image={this.state.playerIMG[`${injury.player.nbaID}.png`] || this.state.posIMG[`${pos}.png`]}
          injury={injury}
        />
      }
    );
    return (
      <div className="container bg-light">
        <div className="row">
          <Loader show={this.state.injuryLoader}/>
          {injuries}
          {this.state.noInjuries ? <div className="m-5 mx-auto">No injuries report today</div> : ''}
        </div>
      </div>
    );
  }
}
