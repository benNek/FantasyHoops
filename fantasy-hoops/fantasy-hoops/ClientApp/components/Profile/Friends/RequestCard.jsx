import React, { Component } from 'react';

export class RequestCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card bg-white rounded mt-1 mx-auto" style={{ width: '100%', height: '4.5rem' }}>
        <div className="card-body">
          <a href={`/profile/${this.props.userName}`}>
            <div className="d-inline-block position-absolute ml-3" style={{ top: '0.2rem' }}>
              <img className="user-card-player" src={this.props.avatar} />
            </div>
            <div className="d-inline-block">
              <p className="align-middle player-name" style={{ paddingLeft: '5rem', paddingTop: '0.3rem' }}>{this.props.userName}</p>
            </div>
          </a>
          <div className="d-inline-block float-right">
            {this.props.type == 'pending' ?
              <div className="row">
                <div className="col">
                  <button type="button" onClick={e => this.props.decline(this.props.id)} className="btn btn-outline-danger mx-auto">Decline Request</button>
                </div>
                <div className="col">
                  <button type="button" onClick={e => this.props.accept(this.props.id)} className="btn btn-success mx-auto">Accept Request</button>
                </div>
              </div>
              :
              <div className="row">
                <div className="col">
                  <button type="button" onClick={e => this.props.cancel(this.props.id)} className="btn btn-outline-danger mx-auto">Cancel Request</button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}