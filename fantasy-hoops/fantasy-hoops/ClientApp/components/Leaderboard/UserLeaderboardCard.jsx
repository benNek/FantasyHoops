import React, { Component } from 'react';

export class UserLeaderboardCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <ul className="image-list">
          <table className="table borderless">
            <tbody>
              <tr>
                <th scope="row">1</th>
                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="img" />
                <td><h6 className="leader-name">Testas</h6></td>
                <td><h6 style={{marginLeft: "-15.2rem"}}>153.2</h6></td>
                <td><h6 className="points">PTS</h6></td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="img" />
                <td><h6 className="leader-name">Testas</h6></td>
                <td><h6 style={{marginLeft: "-15.2rem"}}>153.2</h6></td>
                <td><h6 className="points">PTS</h6></td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="img" />
                <td><h6 className="leader-name">Paulius</h6></td>
                <td><h6 style={{marginLeft: "-15.2rem"}}>153.2</h6></td>
                <td><h6 className="points">PTS</h6></td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <img src="https://bootdey.com/img/Content/avatar/avatar4.png" className="img" />
                <td><h6 className="leader-name">Donatas</h6></td>
                <td><h6 style={{marginLeft: "-15.2rem"}}>153.2</h6></td>
                <td><h6 className="points">PTS</h6></td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="img" />
                <td><h6 className="leader-name">Tadas</h6></td>
                 <td><h6 style={{marginLeft: "-15.2rem"}}>153.2</h6></td>
                <td><h6 className="points">PTS</h6></td>
              </tr>
            </tbody>
          </table>
        </ul>
    );
  }
}