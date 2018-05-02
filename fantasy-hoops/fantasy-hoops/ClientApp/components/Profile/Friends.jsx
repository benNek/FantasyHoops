import React, { Component } from 'react';
import { UserCard } from './UserCard';

export class Friends extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div className="tab-pane" id="friends">
        <div className="container">
          <div className="row">
            <UserCard
              userName='Mia'
              avatar='https://images-na.ssl-images-amazon.com/images/M/MV5BMzc1YTA1ZjItMWRhMy00ZTBlLTkzNTgtNTc4ZDE3YTM3ZDk2XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY1000_SX1000_AL_.jpg'
              color='#FFC200'
            />
            <UserCard
              userName='Marius J'
              avatar='https://scontent.fkun1-1.fna.fbcdn.net/v/t1.0-9/13239169_1271047856257485_6830331749001568475_n.jpg?oh=0d53f5d633ac28886a28f4cb526b081f&oe=5B424B97'
              color='#C4CED4'
            />
            <UserCard
              userName='BMW'
              avatar='https://scontent.fkun1-1.fna.fbcdn.net/v/t1.0-9/14224681_1835819563319780_8589611419845902340_n.jpg?oh=27fd918775e3d13e4bf6656b419b812a&oe=5B44A3CB'
              color='#6F2633'
            />
            <UserCard
              userName='Tete'
              avatar='https://scontent.fkun1-1.fna.fbcdn.net/v/t1.0-9/12552976_1285246738167436_7192865616759638781_n.jpg?oh=1586dc13094e9366b741d973e8ffbb9f&oe=5B4B4128'
              color='#552583'
            />
            <UserCard
              userName='Benas Nekrosius'
              avatar='https://scontent.fkun1-1.fna.fbcdn.net/v/t1.0-1/22008227_1547763031950103_6781077529679133042_n.jpg?oh=aae2c5d83b199de386a5160861333d37&oe=5B49B5DF'
              color='#008248'
            />
            <UserCard
              userName='Sapauskas'
              avatar='https://scontent.fkun1-1.fna.fbcdn.net/v/t1.0-9/22405437_1721131804626423_8370660712586694540_n.jpg?oh=59cfc034b8ce609fd15e5e6a69538e7f&oe=5B3302B6'
              color='#E56020'
            />
            <UserCard
              userName='Doughnutas'
              avatar='https://scontent.fkun1-1.fna.fbcdn.net/v/t1.0-9/16426032_1290343324367341_8459229942170318167_n.jpg?oh=bea9b43aecee12c2fbe0289ca5f28f01&oe=5B333938'
              color='#002D62'
            />
          </div>
        </div>
      </div>
    );
  }
}
