import React, { Component } from 'react';
import { UserScore } from './UserScore';
import { PlayerModal } from '../PlayerModal/PlayerModal';
import shortid from 'shortid';
import { importAll } from '../../utils/reusableFunctions';
import { Loader } from '../Loader';

export class InfoPanel extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);

    this.state = {
      stats: '',
      posIMG: this.getPosImages(),
      playerIMG: this.getPlayerImages(),
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
    const user = this.props.user;
    const recentActivity = () => {
      if (!this.props.loader) {
        const recentActivity = _.map(
          user.recentActivity,
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
        return <div>{recentActivity}</div>
      }
      else {
        return (
          <div className="p-5">
            <Loader show={this.props.loader} />
          </div>
        )
      };
    }


    return (
      <div className="tab-pane active" id="profile">
        <div className="row">
          <div className="col-md-6">
            <h6>About</h6>
            <p className='about-me'>
              {user.description}
            </p>
          </div>
          <div className="col-md-6">
            <h6 style={{ paddingLeft: '1.1rem' }}>Favorite team</h6>
            <div className="team-badge">
              <span href="/#" className="badge badge-dark badge-pill"
                style={{ backgroundColor: user != '' ? user.team.color : '' }}
              >
                {user != '' ? user.team.name : ''}
              </span>
            </div>
            <hr />
            <span className="badge badge-primary"><i className="fa fa-ban"></i> Streak: {user.streak}</span>
            <span className="badge badge-success"><i className="fa fa-cog"></i> Weekly Score: {Math.round(user.totalScore * 100) / 100}</span>
            <span className="badge badge-danger"><i className="fa fa-eye"></i> Ranking: {user.position}</span>
          </div>
          <div className="col-md-12">
            <h5 className="mt-2"><span className="fa fa-clock-o ion-clock"></span> Recent Activity</h5>
            {recentActivity()}
          </div>
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

  importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
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