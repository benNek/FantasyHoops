import React, { Component } from 'react';
import { UserCard } from './Profile/UserCard';
import defaultPhoto from '../content/images/default.png';

export class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: '',
      userIMG: this.getUserImages()
    }
  }


 /* handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });*/

    

      render() {

        return (
          <div className="container bg-light pt-4 pb-2">
            <input className="form-control m-3 mb-4" type="search" placeholder="Search" aria-label="Search" style={{ width: '20rem' }} />
            <div className="center col">
              <div className="row">
                {users}
              </div>
            </div>
          </div >
        );  
    }

    }
  

    

  


