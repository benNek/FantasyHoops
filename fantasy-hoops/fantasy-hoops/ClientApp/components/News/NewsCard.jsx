import React, { Component } from 'react';


export class NewsCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div className="container">
        <div className="card-title card-header">
          <h4>{this.props.news.title}</h4>
        </div>
        <div clasName="row justify-content-center">
          <div id="summary">
            <p className="collapse" id="collapseSummary">
              <p className="card-text">{this.props.news.news}</p>
            </p>
            <a className="collapsed" data-toggle="collapse" href="#collapseSummary" aria-expanded="false" aria-controls="collapseSummary"></a>
          </div>
        </div>
      </div>
    );
  }
}