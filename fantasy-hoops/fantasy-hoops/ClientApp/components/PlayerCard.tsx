import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class PlayerCard extends React.Component<RouteComponentProps<{}>> {

    public render() {
        return <div className="card" style={{ width: '20rem' }}>
            <img className="card-img-top" src="..." alt="Card image cap"></img>
            <div className="card-block">
                <h4 className="card-title">Card title</h4>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>;
    }
}
