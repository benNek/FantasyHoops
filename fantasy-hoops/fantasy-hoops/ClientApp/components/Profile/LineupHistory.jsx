import React, { Component } from 'react';
import shortid from 'shortid';
import { importAll } from '../../utils/reusableFunctions';
import { Loader } from '../Loader';
import { UserScore } from './UserScore';
import icon from '../../content/basketball-player-scoring.svg';
import { parse } from '../../utils/auth';
const user = parse();

export class LineupHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: user,
      loader: true,
      posIMG: this.getPosImages(),
      playerIMG: this.getPlayerImages()
    }
  }

  async componentWillMount() {
    await fetch(`http://localhost:51407/api/user/${user.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          user: res,
          loader: false,
          readOnly: false
        });
      });
  }

  render() {
    const history = () => {
      if (!this.state.loader) {
        return _.map(
          this.state.user.history,
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
      } else {
        return '';
      }
    }

    return (
      <div className="container bg-light p-4">
        <h3 className="text-center"><span><img src={icon} width="65rem" /></span> User lineup history</h3>
        <div className="m-3">
        </div>
        <div className="center">
          {history()}
        </div>
        <Loader show={this.state.loader} />
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
