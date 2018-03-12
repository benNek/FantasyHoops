import React, { Component } from 'react';

export class Rules extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="container mt-4 bg-light" style={{ paddingTop: '5em' }}>
        <h3>POSITIONS</h3>
        <br />
        <ol>
          <li><h4>Point Guard</h4></li>
          <p>The point guard needs to be the best ball handler, dribbler and passer as he handles the ball the most out of all the players on the team. He needs to bring the ball down the court and initiate offensive plays.
            Point guards can also be the shortest player on the team as they use their intelligence and court vision to coordinate all his teammates on offense.
            Point guards need to have a good long distance shooting, though it's not quite as crucial as for shooting guards. However, some point guards take as many shots as shooting guards.
          </p>
          <li><h4>Shooting Guard</h4></li>
          <p>The shooting guard is potentially the shortest player in the team. However, he has to be good at dribbling fast, passing and having court vision by seeing the court. He is responsible for bringing the ball down the court and setting up offensive plays.
            The shooting guard is also the player who takes the most shots. He needs to be an accurate shooter from three-point range.
            The shooting guard is potentially the shortest player in the team. However, he has to be good at dribbling fast, passing and having court vision by seeing the court. He is responsible for bringing the ball down the court and setting up offensive plays. In terms of height, shooting guards are taller than point guards.
          </p>
          <li><h4>Small Forward</h4></li>
          <p>The small forward is usually the shorter of the two forwards on the team. However, the small forward must have enough height and ability to play inside, and on top of that, play like the centres and power forwards, but also be able to guard.
            Small forwards are also the second or third best shooters from distance of the five positions as they also play defensive roles.
          </p>
          <li><h4>Power Forward</h4></li>
          <p>The power forwards are usually the next tallest players in the team, who are closest to the centre in physical attributes and playing style, but with more speed. A forward may play under the hoop or are expected to operate in the wings and corner areas.
            They must be strong and comfortable with a lot of physical play and must be an effective rebounder and effective inside shooter like the centre. The power forward is also expected to shoot from  further distances than the centre.
          </p>
          <li><h4>Center</h4></li>
          <p>The center is generally the tallest player who is positioned near the basket as he must be able to get up as high as possible for rebounds. He is also required to be more physically domineering with more physical strength and overall athleticism.
            Offensive -- The centre's goal is to get open for a pass and to shoot. They are required to block defenders, and to open other players up for driving to the basket for a goal. Centres are expected to get some offensive rebounds and put-backs.
            The centre should be good at making quick jump shots, hook shots, and using the backboard on his shots.
            Defensive -- On defense, the centre's main responsibility is to keep opponents from shooting by blocking shots and passes in the key area. They also are expected to get more rebounds because they're taller.
          </p>
        </ol>
        <br />
        <h3>BUDGET</h3>
        <p>When purchasing players for your team, you want to make sure that you remain within your budget (the  budget is $300K). Budget constant for every day, changing only the price of players. Ultimately, you want to choose players whose values will not be too high budget that day.
          Player salaries are determined by the relation between fantasy scoring and the sychanging stem projected fpts per game. For example when player x, which the system projected his average fpts for the season will be 34, scores 26 fpts in his last game, his price will decrease in a few thousands of fantasy dollars. Note that the minimal price of a player is $25000. The player‘s price are calculated in the last 5 matches. Player price are calculated daily, usually a couple of hours after the last game of the day. You will be able to view all price changes in the Price Movers page.
          </p>
          <br/>
        <h3>DON'T ALLOW TO CHOOSE LINEUP IF THERE ARE NO GAMES ON THAT DAY</h3>
        <p>For each game day, NBA players will get their recent stats and scores a few hours after the last game is finished. In addition, players price are also calculated even if the player did not play the previous day. These daily updates reflects your fantasy team score and value.</p>
      </div>
    );
  }
}
