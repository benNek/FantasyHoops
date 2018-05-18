import React, { Component } from 'react';
import { Select } from '../Inputs/Select';
import { Radar, Line } from 'react-chartjs-2';

export class Charts extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      criteria: 'ovr',
      criteriaTitle: 'Overall'
    }
    this.options = [
      {
        teamId: 0,
        name: 'Overall',
        criteria: 'ovr'
      },
      {
        teamId: 1,
        name: 'Points',
        criteria: 'pts'
      },
      {
        teamId: 2,
        name: 'Assists',
        criteria: 'ast'
      },
      {
        teamId: 3,
        name: 'Turnovers',
        criteria: 'tov'
      },
      {
        teamId: 4,
        name: 'Rebounds',
        criteria: 'treb'
      },
      {
        teamId: 5,
        name: 'Steals',
        criteria: 'stl'
      },
      {
        teamId: 6,
        name: 'Blocks',
        criteria: 'blk'
      },
      {
        teamId: 7,
        name: 'Fantasy Points',
        criteria: 'fp'
      },
      {
        teamId: 8,
        name: 'Price',
        criteria: 'price'
      }
    ];
  }

  render() {
    return (
      <div>
        <Select
          options={this.options}
          id="criteria"
          value={this.state.criteriaTitle}
          defaultValue="Choose a category"
          onChange={this.handleChange}
        />
        <div className='mt-3 mx-auto' style={{ maxWidth: '50rem', width: '100%' }} >
          {
            this.state.criteria == 'ovr'
              ? <div style={{ overflow: 'auto' }}><Radar data={this.getRadarData()} options={this.getRadarOptions()} /></div>
              : <div style={{ overflow: 'auto' }}><Line data={this.getChartData()} options={this.getChartOptions()} /></div>
          }
        </div>
      </div>
    );
  }

  getRadarData() {
    if (!this.props.stats) {
      return {};
    }
    let labels = ['Points', 'Assists', 'Turnovers', 'Rebounds', 'Blocks', 'Steals'];
    let values = [];
    values.push(this.props.stats.percentages.pts);
    values.push(this.props.stats.percentages.ast);
    values.push(this.props.stats.percentages.tov);
    values.push(this.props.stats.percentages.reb);
    values.push(this.props.stats.percentages.blk);
    values.push(this.props.stats.percentages.stl);

    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: this.hexToRgbA(this.props.stats.team.color),
          data: values
        }
      ]
    }
    return data;
  }

  getRadarOptions() {
    const options = {
      scale: {
        ticks: {
          display: false,
          beginAtZero: true,
          min: 0,
          max: 100
        }
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
    return options;
  }

  getChartData() {
    if (!this.props.stats) {
      return {};
    }
    let labels = [];
    let values = [];

    const games = this.props.stats.games;
    games.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    games.forEach(game => {
      labels.push(game.date.substring(5, 10));
      values.push(game[this.state.criteria]);
    });

    const data = {
      labels: labels,
      datasets: [
        {
          label: this.state.criteriaTitle,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: this.props.stats.team.color,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: values
        }
      ],
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
    return data;
  }

  getChartOptions() {
    const options = {
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            suggestedMin: 0,
            beginAtZero: true
          }
        }]
      },
      legend: {
        display: false
      },
    }
    return options;
  }

  handleChange(e) {
    this.options.forEach(option => {
      if (option.name === e.target.value) {
        this.setState({
          criteria: option.criteria,
          criteriaTitle: option.name
        });
      }
    })
  }

  hexToRgbA(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.4)';
    }
    throw new Error('Bad Hex');
  }
}
