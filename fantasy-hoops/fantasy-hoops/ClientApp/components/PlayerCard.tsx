import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import PlayerAPI from '../mocked/players.js'

export class PlayerCard extends React.Component<any, any> {

    public render() {
        const player = PlayerAPI.get(
            parseInt(this.props.match.params.id)
        )

        if (!player) {
            return <div>Sorry, but the player was not found</div>
        }

        return <div className="card" style={{ width: '20rem', backgroundColor: `${player.teamColor}` }}>
            <img className="card-img-top" style={{maxHeight: '150px'}}
                src={player.img} alt="Card image cap" ></img>
            < div className="card-block" style={{ backgroundColor: 'white' }} >
                <h2 className="card-title">{player.name} {player.surname}, {player.position}</h2>
                <h4 className="card-text">{player.price}</h4>
                <a href="#" className="btn btn-primary">Select</a>
            </div>
        </div>;
    }
}
