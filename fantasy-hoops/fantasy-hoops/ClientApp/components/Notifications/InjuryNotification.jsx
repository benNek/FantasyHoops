import React, { Component } from 'react';
import moment from 'moment';

export class InjuryNotification extends Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);

    this.state = {
    }
  }

  select() {
    this.props.toggleNotification(this.props.notification);
  }

  getDate() {
    const date = new Date(this.props.notification.dateCreated);
    const serverTime = new Date(this.props.serverTime);
    const diff = Math.abs(serverTime.getTimezoneOffset()) / 60;
    return date.setHours(date.getHours() + diff);
  }

  render() {
    let read = "card-body rounded text-primary";
    if (this.props.notification.readStatus)
      read = "card-body text-muted";

    return (
      <a onClick={this.select} className="card cursor-pointer link" style={{ width: '24rem', height: '6.7rem' }}>

        {/* <a onClick={this.select} className="dropdown-item cursor-default text-center"> */}
        <div className={read} style={{ margin: '-0.4rem', marginLeft: -6 }}>

          <div className="row">

            <div className="card-circle position-absolute"style={{ backgroundColor: this.props.notification.player.team.color, marginTop: '0.5rem' }}>
              <img className="a" style={{ paddingRight: '3rem', marginLeft: '-0.6rem', marginTop: '4' }} src={require(`../../content/images/players/${this.props.notification.player.nbaID}.png`)}
                width="125rem" alt="10" left="10" />
            </div>
          <p classname="text" style={{marginLeft: 60}}>
          <div className="col ml-2">
               <h5 className="card-text" style={{}}>{this.props.notification.player.firstName[0]}. {this.props.notification.player.lastName} is {this.props.notification.injuryStatus.toLowerCase()}!</h5>
          
          </div>
          <p className="card-text"
                style={{ marginTop: '0.3rem', fontWeight: '400', marginLeft: 23 }}
              ><span className="text">{this.props.notification.injuryDescription}</span>
             </p> 

         
          <p style={{ margin: '-0.8rem 0 0 0', marginLeft: 23, marginTop: -13 }}> 
            {moment(this.getDate()).fromNow()}
          </p>
        </p> 
        </div>  
          </div>
        
      </a>
    );
  }
}
