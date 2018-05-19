import React, { Component } from 'react';
import shortid from 'shortid';
import moment from 'moment';
import defaultLogo from '../../content/images/defaultLogo.png';
import { Loader } from '../Loader';
const LOAD_COUNT = 10;

export class Gamelog extends Component {
  constructor(props) {
    super(props);
    this.compare = this.compare.bind(this);
    this.loadMore = this.loadMore.bind(this);

    this.state = {
      games: this.props.stats.games,
      nbaID: this.props.stats.nbaID,
      loadCounter: 0,
      loader: false
    }
  }

  async loadMore() {
    this.setState({
      loader: true,
      loadCounter: this.state.loadCounter + 1
    });
    await fetch(`http://localhost:51407/api/stats/${this.state.nbaID}?start=${this.state.games.length}&count=${LOAD_COUNT}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          games: this.state.games.concat(res.games),
          loader: false
        });
      });
  }

  render() {
    const btn = this.state.loadCounter * LOAD_COUNT + 10 > this.state.games.length
      ? (
        <div className="p-1 float-left">
          <Loader show={this.state.loader} />
        </div>
      )
      : <button className="btn btn-primary float-left m-2" onClick={this.loadMore}>See more</button>;
    return (
      <div className="table-responsive">
        <table className="table table-sm table-hover table-bordered text-right">
          <thead>
            <tr className="bg-dark text-light">
              <th scope="col" style={{ width: '6rem' }}>DATE</th>
              <th scope="col" style={{ width: '4rem' }}>OPP</th>
              <th scope="col" style={{ width: '6rem' }}>SCORE</th>
              <th scope="col" style={{ width: '3rem' }}>MIN</th>
              <th scope="col" style={{ width: '3rem' }}>FGM</th>
              <th scope="col" style={{ width: '3rem' }}>FGA</th>
              <th scope="col" style={{ width: '3rem' }}>FG%</th>
              <th scope="col" style={{ width: '3rem' }}>3PM</th>
              <th scope="col" style={{ width: '3rem' }}>3PA</th>
              <th scope="col" style={{ width: '3rem' }}>3P%</th>
              <th scope="col" style={{ width: '3rem' }}>FTM</th>
              <th scope="col" style={{ width: '3rem' }}>FTA</th>
              <th scope="col" style={{ width: '3rem' }}>FT%</th>
              <th scope="col" style={{ width: '3rem' }}>DREB</th>
              <th scope="col" style={{ width: '3rem' }}>OREB</th>
              <th scope="col" style={{ width: '3rem' }}>TREB</th>
              <th scope="col" style={{ width: '3rem' }}>AST</th>
              <th scope="col" style={{ width: '3rem' }}>BLK</th>
              <th scope="col" style={{ width: '3rem' }}>STL</th>
              <th scope="col" style={{ width: '3rem' }}>FLS</th>
              <th scope="col" style={{ width: '3rem' }}>TOV</th>
              <th scope="col" style={{ width: '3rem' }}>PTS</th>
              <th scope="col" style={{ width: '3rem' }}>GS</th>
              <th scope="col" style={{ width: '3rem' }}>FP</th>
            </tr>
          </thead>
          <tbody>
            {this.getRows(btn)}
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

  getRows(btn) {
    if (this.props.loader)
      return '';

    const teamLogo = this.getLogo(this.props.stats.team.abbreviation);
    const rows = this.state.games.sort(this.compare).map((s) => {
      const abbreviation = s.opponent ? s.opponent.abbreviation : '';
      let score = '';
      if (!s.score)
        return;
      var str = s.score.split('-');
      if (parseInt(str[0]) > parseInt(str[1]))
        score = <span className="text-success">W</span>;
      else score = <span className="text-danger">L</span>;
      return <tr key={shortid()} >
        <td style={{ width: '6rem' }}>{moment(s.date).format("ddd MM/DD")}</td>
        <td style={{ width: '4rem' }}><img src={this.getLogo(abbreviation)} alt={abbreviation} width='40rem' style={{ right: '0' }} /></td>
        <td style={{ width: '6rem' }}>{score} {s.score}</td>
        <td style={{ width: '3rem' }}>{s.min}</td>
        <td style={{ width: '3rem' }}>{s.fgm}</td>
        <td style={{ width: '3rem' }}>{s.fga}</td>
        <td style={{ width: '3rem' }}>{s.fgp}</td>
        <td style={{ width: '3rem' }}>{s.tpm}</td>
        <td style={{ width: '3rem' }}>{s.tpa}</td>
        <td style={{ width: '3rem' }}>{s.tpp}</td>
        <td style={{ width: '3rem' }}>{s.ftm}</td>
        <td style={{ width: '3rem' }}>{s.fta}</td>
        <td style={{ width: '3rem' }}>{s.ftp}</td>
        <td style={{ width: '3rem' }}>{s.dreb}</td>
        <td style={{ width: '3rem' }}>{s.oreb}</td>
        <td style={{ width: '3rem' }}>{s.treb}</td>
        <td style={{ width: '3rem' }}>{s.ast}</td>
        <td style={{ width: '3rem' }}>{s.blk}</td>
        <td style={{ width: '3rem' }}>{s.stl}</td>
        <td style={{ width: '3rem' }}>{s.fls}</td>
        <td style={{ width: '3rem' }}>{s.tov}</td>
        <td style={{ width: '3rem' }}>{s.pts}</td>
        <td style={{ width: '3rem' }}>{s.gs}</td>
        <td style={{ width: '3rem' }}>{s.fp}</td>
      </tr>;
    });
    if (!(this.state.loadCounter * LOAD_COUNT + 10 > this.state.games.length) || this.state.loader)
      rows.push(
        <tr className="no-hover" key={shortid()} style={{ height: '7rem' }}>
          <td className="align-middle">{btn}</td>
        </tr>
      );
    return rows;
  }
}
