import React, { Component } from 'react';
import { UserScore } from './UserScore';
import { PlayerModal } from '../PlayerModal';
import shortid from 'shortid';

export class InfoPanel extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);

    this.state = {
      stats: '',
      posIMG: this.getPosImages(),
      playerIMG: this.getPlayerImages(),
    }
  }

  showModal(player) {
    fetch(`http://localhost:51407/api/stats/${player.nbaID}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          stats: res
        });
      });
  }

  render() {
    const user = this.props.user;
    let recentActivity = '';
    if (user.recentActivity != null) {
      recentActivity = _.map(
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
            <span className="badge badge-success"><i className="fa fa-cog"></i> Weekly Score: {user.totalScore}</span>
            <span className="badge badge-danger"><i className="fa fa-eye"></i> Ranking: {user.weeklyRanking}</span>
          </div>
          <div className="col-md-12">
            <h5 className="mt-2"><span className="fa fa-clock-o ion-clock"></span> Recent Activity</h5>
            {recentActivity}
          </div>
        </div>
        <PlayerModal
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
      return this.importAll(require.context('../../content/images/positions', false, /\.(png|jpe?g|svg)$/))
    }
    catch (err) {
      return ''
    }
  }

  getPlayerImages() {
    try {
      return this.importAll(require.context('../../content/images/players', false, /\.(png|jpe?g|svg)$/))
    }
    catch (err) {
      return ''
    }
  }
}
