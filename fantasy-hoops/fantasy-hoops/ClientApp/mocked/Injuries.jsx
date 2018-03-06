const InjuriesAPI = {
  injuries: [
    {
      id: 200752,
      name: 'Rudy',
      surname: 'Gay',
      position: 'SF',
      teamColor: '#C4CED4',
      subTitle: 'Gay is active',
      news: "Gay is considered day-to-day after suffering an injury to his left ear drum in Monday's win. He briefly went to the locker room after a collision in the second quarter before ultimately returning to play 14 minutes. The Spurs will likely release an official injury report on Wednesday during their next practice in advance of Thursday's contest vs. the Warriors. Pau Gasol was also involved in a collision on Monday against his brother Marc and his status for Thursday is in doubt. Tony Parker discussed Gasol's injury after the game by stating, \"He hurt his shoulder and he told me it was bad. So we will see, but I'm pretty sure he's not going to play against Golden State.\" Kawhi Leonard (quad) remains sidelined without a timetable for return, and in the only game this season without Leonard, Gasol, and Gay, LaMarcus Aldridge and Dejounte Murray both exceeded 47.0 DraftKings points while Kyle Anderson produced 35.25 DK points.",
      status: "Active",
      link: "https://www.mysanantonio.com/sports/spurs/article/Spurs-Gay-day-to-day-after-injurying-ear-drum-12732418.php"
    },
    {
      id: 1628366,
      name: 'Lonzo',
      surname: 'Ball',
      position: 'PG',
      teamColor: '#552583',
      subTitle: 'Ball is out',
      news: "Lonzo Ball out tonight with torn ACL.",
      status: "Out",
      link: "https://www.mysanantonio.com/sports/spurs/article/Spurs-Gay-day-to-day-after-injurying-ear-drum-12732418.php"
    },
    {
      id: 202685,
      name: 'Jonas',
      surname: 'Valanciunas',
      position: 'C',
      teamColor: '#CD1141',
      subTitle: 'Valanciunas is questionable',
      news: "Jonas Valanciunas Questionable with bite tongue.",
      status: "Questionable",
      link: "https://www.mysanantonio.com/sports/spurs/article/Spurs-Gay-day-to-day-after-injurying-ear-drum-12732418.php"
    }
  ],
  all: function () { return this.injuries }
}

export default InjuriesAPI