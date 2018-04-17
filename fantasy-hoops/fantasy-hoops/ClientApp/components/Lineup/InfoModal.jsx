import React, { Component } from 'react';

export class InfoModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" id="exampleModalLabel">Scoring Info</h3>
              <button type="button" className="close btn-no-outline" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <table className="table table-hover">
                <thead className='bg-secondary'>
                  <tr>
                    <th scope="row" colSpan="2" className='text-center text-light' >Offensive</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className='text-left'>Points</th>
                    <td className='text-right text-success'>1 FP</td>
                  </tr>
                  <tr>
                    <th scope="row" className='text-left'>Assists</th>
                    <td className='text-right text-success'>1.5 FP</td>
                  </tr>
                  <tr>
                    <th scope="row" className='text-left'>Turnovers</th>
                    <td className='text-right text-danger'>-1 FP</td>
                  </tr>
                </tbody>
                <thead className='bg-secondary'>
                  <tr>
                    <th scope="row" colSpan="2" className='text-center text-light' >Defensive</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className='text-left'>Rebounds</th>
                    <td className='text-right text-success'>1.2 FP</td>
                  </tr>
                  <tr>
                    <th scope="row" className='text-left'>Steals</th>
                    <td className='text-right text-success'>3 FP</td>
                  </tr>
                  <tr>
                    <th scope="row" className='text-left'>Blocks</th>
                    <td className='text-right text-success'>3 FP</td>
                  </tr>
                </tbody>
              </table>
              <hr />
                * FP - Fantasy Points
            </div>
          </div>
        </div>
      </div>
    );
  }
}
