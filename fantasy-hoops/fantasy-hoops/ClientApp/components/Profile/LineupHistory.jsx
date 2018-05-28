import React, { Component } from 'react';
import shortid from 'shortid';
import { importAll } from '../../utils/reusableFunctions';
import { Loader } from '../Loader';
import { UserScore } from './UserScore';
import { PlayerModal } from '../PlayerModal/PlayerModal';
import icon from '../../content/basketball-player-scoring.svg';
import { parse } from '../../utils/auth';
const user = parse();
const LOAD_COUNT = 5;

export class LineupHistory extends Component {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
    this.showModal = this.showModal.bind(this);

    this.state = {
      stats: '',
      loadCounter: 0,
      user: user,
      history: [],
      loader: true,
      modalLoader: true,
      posIMG: this.getPosImages(),
      playerIMG: this.getPlayerImages()
    }
  }

  setModal() {
    $("#playerModal").on("hidden.bs.modal", () => {
      this.setState({
        modalLoader: true,
        renderChild: false
      });
    });
  }

  async showModal(player) {
    $('[data-toggle="tooltip"]').tooltip("hide");
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

  async componentWillMount() {
    await fetch(`http://localhost:51407/api/user/${user.id}?count=10`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          history: res.history,
          loader: false,
          readOnly: false
        });
      });
  }

  async loadMore() {
    this.setState({
      loadCounter: this.state.loadCounter + 1,
      loader: true
    });
    await fetch(`http://localhost:51407/api/user/${user.id}?start=${this.state.history.length}&count=${LOAD_COUNT}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          history: this.state.history.concat(res.history),
          loader: false
        });
      });
  }

  render() {
    const history = _.map(
      this.state.history,
      (activity) => {
        return (
          <UserScore
            key={shortid()}
            posIMG={this.state.posIMG}
            playerIMG={this.state.playerIMG}
            activity={activity}
            showModal={this.showModal}
          />
        )
      });
    const btn = this.state.loadCounter * LOAD_COUNT + 10 > this.state.history.length
      ? ''
      : <button className="btn btn-primary m-3" onClick={this.loadMore}>See more</button>;

    return (
      <div className="container bg-light p-4">
        <h3 className="text-center"><span><img src={icon} width="65rem" /></span> Your lineup history</h3>
        <div className="center">
          {history}
          <Loader show={this.state.loader} />
        </div>
        <div className="text-center">
          {!this.state.loader ? btn : ''}
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
