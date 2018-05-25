import React, { Component } from 'react';
import { InjuryCard } from './InjuryCard';
import _ from 'lodash';
import shortid from 'shortid';
import { Loader } from '../Loader';
import { importAll } from '../../utils/reusableFunctions';
import { PlayerModal } from '../PlayerModal/PlayerModal';
import { EmptyJordan } from '../EmptyJordan';

export class InjuriesFeed extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);

    this.state = {
      noInjuries: false,
      injuries: [],
      playerIMG: this.getPlayerImages(),
      posIMG: this.getPosImages(),
      injuryLoader: true,
      modalLoader: true,
      renderChild: true
    }
  }

  componentDidMount() {
    $("#playerModal").on("hidden.bs.modal", () => {
      this.setState({
        modalLoader: true,
        renderChild: false
      });
    });
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

  async showModal(player) {
    this.setState({ modalLoader: true })
    await fetch(`http://localhost:51407/api/stats/${player.nbaID}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          stats: res,
          modalLoader: false,
          renderChild: true
        });
      });
  }

  render() {
    if (this.state.injuryLoader)
      return <div className="m-5"><Loader show={this.state.injuryLoader} /></div>;

    if (this.state.injuries.length == 0)
      return (
        <div className="p-5">
          <EmptyJordan message="No injuries report today..." />
        </div>
      );

    const injuries = _.map(this.state.injuries,
      (injury) => {
        const pos = injury.player.position.toLowerCase();
        return <InjuryCard
          serverTime={this.state.serverTime}
          key={shortid()}
          image={this.state.playerIMG[`${injury.player.nbaID}.png`] || this.state.posIMG[`${pos}.png`]}
          injury={injury}
          showModal={this.showModal}
        />
      }
    );
    return (
      <div className="container bg-light">
        <div className="row">
          {injuries}
        </div>
        <PlayerModal
          renderChild={this.state.renderChild}
          loader={this.state.modalLoader}
          stats={this.state.stats}
          image={this.state.stats
            ? this.state.playerIMG[`${this.state.stats.nbaID}.png`] || this.state.posIMG[`${this.state.stats.position.toLowerCase()}.png`]
            : ''}
        />
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
