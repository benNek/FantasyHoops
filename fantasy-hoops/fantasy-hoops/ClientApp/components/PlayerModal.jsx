import React, { Component } from 'react';

export class PlayerModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const player = this.props.player ? this.props.player : '';
    return (
      <div className="modal fade" id="playerModal" tabIndex="-1" role="dialog" aria-labelledby="playerModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="playerModalLabel">
                {player.firstName} {player.lastName}</h5>
              <a type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </a>
            </div>
            <div className="modal-body">
              PTS {player.pts} REB {player.reb} AST {player.ast}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}