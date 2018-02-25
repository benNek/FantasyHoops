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
      <img className="card-img-top" src={player.img} alt="Card image cap" ></img>
      < div className="card-block" >
        <h2 className="card-title">{player.name} {player.surname}, {player.position}</h2>
        <h4 className="card-text">{player.price}</h4>
        {this.buttonState()}
      </div>
    </div>);
  }

  buttonState() {
    const innerHTML = this.state.selected ? <a className="glyphicon glyphicon-remove"></a> : "Select";
    return <a className={`btn ${this.state.selected ? 'btn-danger' : 'btn-primary'} text-center`}
            onClick={() => { this.select() }}>
            {innerHTML}
          </a>
  }

  select() {
    this.setState({
      selected: !this.state.selected
    });
  }
}
