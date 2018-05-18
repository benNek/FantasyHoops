import React, { Component } from 'react';
import shortid from 'shortid';
import moment from 'moment';

export class Gamelog extends Component {
  constructor(props) {
    super(props);
    this.compare = this.compare.bind(this);

    this.state = {
    }
  }

  render() {
    return (
      <div className="table-responsive">
        <table className="table table-sm table-hover table-bordered text-right">
          <thead>
            <tr className="bg-dark text-light">
              <th scope="col" style={{ minWidth: '6rem' }}>DATE</th>
              <th scope="col">OPP</th>
              <th scope="col" style={{ minWidth: '6rem' }}>SCORE</th>
              <th scope="col">MIN</th>
              <th scope="col">FGM</th>
              <th scope="col">FGA</th>
              <th scope="col">FG%</th>
              <th scope="col">3PM</th>
              <th scope="col">3PA</th>
              <th scope="col">3P%</th>
              <th scope="col">FTM</th>
              <th scope="col">FTA</th>
              <th scope="col">FT%</th>
              <th scope="col">DREB</th>
              <th scope="col">OREB</th>
              <th scope="col">TREB</th>
              <th scope="col">AST</th>
              <th scope="col">BLK</th>
              <th scope="col">STL</th>
              <th scope="col">FLS</th>
              <th scope="col">TOV</th>
              <th scope="col">PTS</th>
              <th scope="col">GS</th>
              <th scope="col">FP</th>
            </tr>
          </thead>
          <tbody>
            {this.getRows()}
          </tbody>
        </table>
      </div>
    );
  }

  compare(a, b) {
    if (a.date < b.date)
      return 1;
    if (a.date > b.date)
      return -1;
    return 0;
  }

  getLogo(abbreviation) {
    try {
      return require(`../../content/images/logos/${abbreviation}.svg`);
    }
    catch (err) {
      return defaultLogo;
    }
  }

  getRows() {
    if (this.props.loader)
      return '';

    const stats = this.props.stats;
    const teamLogo = this.getLogo(stats.team.abbreviation);
    const rows = stats.games.sort(this.compare).map((s) => {
      const abbreviation = s.opponent ? s.opponent.abbreviation : '';
      let score = '';
      if (!s.score)
        return;
      var str = s.score.split('-');
      if (parseInt(str[0]) > parseInt(str[1]))
        score = <span className="text-success">W</span>;
      else score = <span className="text-danger">L</span>;
      return <tr key={shortid()} >
        <td style={{ minWidth: '6rem' }}>{moment(s.date).format("ddd MM/DD")}</td>
        <td><img src={this.getLogo(abbreviation)} alt={abbreviation} width='40rem' style={{ right: '0' }} /></td>
        <td style={{ minWidth: '6rem' }}>{score} {s.score}</td>
        <td>{s.min}</td>
        <td>{s.fgm}</td>
        <td>{s.fga}</td>
        <td>{s.fgp}</td>
        <td>{s.tpm}</td>
        <td>{s.tpa}</td>
        <td>{s.tpp}</td>
        <td>{s.ftm}</td>
        <td>{s.fta}</td>
        <td>{s.ftp}</td>
        <td>{s.dreb}</td>
        <td>{s.oreb}</td>
        <td>{s.treb}</td>
        <td>{s.ast}</td>
        <td>{s.blk}</td>
        <td>{s.stl}</td>
        <td>{s.fls}</td>
        <td>{s.tov}</td>
        <td>{s.pts}</td>
        <td>{s.gs}</td>
        <td>{s.fp}</td>
      </tr>;
    });
    return rows;
  }
}
