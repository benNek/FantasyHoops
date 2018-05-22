import React, { Component } from 'react';

export class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className>
          <p id="main-text" className="text-center title" style={{ marginTop: '15%' }}>
            Fantasy Hoops
          </p>
          <div className="text-center">
            <a href="/lineup" className="btn btn-primary mt-4" role="button" style={{ width: '20%', fontSize: '80%' }}>
              Play Now!
            </a>
          </div>
        </div>
        <video muted autoPlay loop id="main-video">
          <source src={require("../content/videos/mainVideo.mp4")} type="video/mp4" />
        </video>
      </div>
    );
  }
}