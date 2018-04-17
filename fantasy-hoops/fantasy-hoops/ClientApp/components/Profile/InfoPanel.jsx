import React, { Component } from 'react';
import { UserScore } from './UserScore';

export class InfoPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user;

    let recentActivity = '';
    if (user.recentActivity != null) {
      recentActivity = _.map(
        user.recentActivity,
        (activity) => {
          return (
            <tr>
              <td>
                <strong>{activity.date.substring(0, 10)}</strong> scored <strong>{activity.score} FP</strong>
              </td>
            </tr>
          )
        });
      /*
      recentActivity = user.recentActivity.forEach(activity => {
        return (
          <tr>
            <td>
              <strong>W</strong> score <strong>Opponent Name</strong>
            </td>
          </tr>
        );
      });
      */
      console.log('hey', recentActivity);
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
            <span className="badge badge-primary"><i className="fa fa-ban"></i> Streak</span>
            <span className="badge badge-success"><i className="fa fa-cog"></i> Total Score</span>
            <span className="badge badge-danger"><i className="fa fa-eye"></i> Ranking</span>
          </div>
          <div className="col-md-12">
            <h5 className="mt-2"><span className="fa fa-clock-o ion-clock float-right"></span> Recent Activity</h5>
            <UserScore />
            <UserScore />
            <UserScore />
            <UserScore />
            <UserScore />
          </div>
        </div>
      </div>
    );
  }
}
