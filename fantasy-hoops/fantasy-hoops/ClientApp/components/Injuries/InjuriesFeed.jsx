import React, { Component } from 'react';
import { InjuryCard } from './InjuryCard';
import InjuriesAPI from '../../mocked/Injuries';
import _ from 'lodash'
import shortid from 'shortid';

export class InjuriesFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noInjuries: false,
      injuries: ''
    }
  }

  componentDidMount() {
    const response = fetch(`http://localhost:51407/api/injuries`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          injuries: res,
          noInjuries: false
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
    let injuries = _.map(this.state.injuries,
      (injury) => {
        return <InjuryCard key={shortid()} injury={injury} />
      }
    );
    return (
      <div className="container mt-4 bg-light" style={{ paddingTop: '5em' }}>
        <div className="row">
          {injuries}
          {this.state.noInjuries ? <div>No injuries report today</div> : ''}
        </div>
      </div>
    );
  }
}
