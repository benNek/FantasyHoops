import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import PlayerAPI from '../mocked/players.js';

export class PlayerCard extends React.Component<any, any> {
  constructor() {
    super();
    this.state = { selected: false };
  }

  public render() {
    const player = PlayerAPI.get(
      parseInt(this.props.match.params.id)
    )

    if (!player) {
      return <div>Sorry, but the player was not found</div>
    }

    return (<div className="card" style={{ backgroundColor: `${player.teamColor}` }}>
    
    <div className="button">{this.buttonState()}</div>
      <div className="player-position">{player.position}</div>
      <div className="price-badge">
        <span className="badge badge-dark">{player.price}</span>
      </div>
      <img className="card-img-top" src={player.img} alt="Card image cap"></img>
      < div className="card-block" >
        <h2 className="card-title">{player.name} {player.surname}</h2>
      </div>
    </div>);
  }

  buttonState() {
    const innerHTML = this.state.selected ? <a className="glyphicon glyphicon-remove"></a> : <a className="glyphicon glyphicon-plus"></a>;
    return <button className={`btn btn-circle btn-lg ${this.state.selected ? 'btn-danger' : 'btn-primary'} text-center`}
      onClick={() => { this.select() }}>
      {innerHTML}
    </button>
  }

  select() {
    this.setState({
      selected: !this.state.selected
    });
  }
}
