import React, { Component } from 'react';
import { InjuryCard } from './InjuryCard';
import _ from 'lodash';
import shortid from 'shortid';
import { Loader } from '../Loader';
import { importAll } from '../../utils/reusableFunctions';
import { EmptyJordan } from '../EmptyJordan';

export class InjuriesFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noInjuries: false,
      injuries: [],
      playerIMG: this.getPlayerImages(),
      posIMG: this.getPosImages(),
      injuryLoader: false,
    }
  }

  async componentWillMount() {
    await fetch(`http://localhost:51407/api/lineup/nextGame`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          serverTime: res.serverTime
        });
      })
    await fetch(`http://localhost:51407/api/injuries`)
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

  render() {
    if (this.state.injuries.length == 0)
      return (
        <EmptyJordan message="No injuries report today..." />
      );

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
          <Loader show={this.state.injuryLoader} />
          {injuries}
          {this.state.noInjuries ? <div className="m-5 mx-auto">No injuries report today</div> : ''}
        </div>
      </div>
    );
  }

  getPosImages() {
    try {
      return importAll(require.context('../../content/images/positions', false, /\.(png|jpe?g|svg)$/))
    }
    catch (err) {
      return ''
    }
  }

  getPlayerImages() {
    try {
      return importAll(require.context('../../content/images/players', false, /\.(png|jpe?g|svg)$/))
    }
    catch (err) {
      return ''
    }
  }
}
