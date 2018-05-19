import React, { Component } from 'react';
import _ from 'lodash';
import { Loader } from '../Loader';
import { Stats } from './Stats';
import { Gamelog } from './Gamelog';
import { Charts } from './Charts';

export class PlayerModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: [],
      loader: true,
      renderChild: true
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.stats !== "")
      await this.setState({
        stats: nextProps.stats
      })
  }

  getContent() {
    if (this.props.loader) {
      return (
        <div className="p-5">
          <Loader show={this.props.loader} />
        </div>
      );
    }
    else {
      const stats = this.state.stats;
      return (
        <div>
          <Stats stats={this.state.stats} image={this.props.image} />
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a className="nav-item nav-link active tab-no-outline" id="nav-gamelog-tab" data-toggle="tab" href="#nav-gamelog" role="tab" aria-controls="nav-gamelog" aria-selected="false">Gamelog</a>
              <a className="nav-item nav-link tab-no-outline" id="nav-charts-tab" data-toggle="tab" href="#nav-charts" role="tab" aria-controls="nav-charts" aria-selected="false">Charts</a>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-gamelog" role="tabpanel" aria-labelledby="nav-gamelog-tab">
              {this.props.renderChild ? <Gamelog stats={this.state.stats} /> : null}
            </div>
            <div className="tab-pane fade" id="nav-charts" role="tabpanel" aria-labelledby="nav-charts-tab">
              <Charts stats={this.state.stats} />
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="modal fade" id="playerModal" tabIndex="-1" role="dialog" aria-labelledby="playerModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg mx-auto" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-right mr-2">
                <a className="close" data-dismiss="modal" aria-label="Close" style={{ right: '0' }}>
                  <span aria-hidden="true">&times;</span>
                </a>
              </div>
              {this.getContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}