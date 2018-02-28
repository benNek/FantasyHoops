const PlayerAPI = {
    players: [
        {
            id: 0,
            name: 'Lonzo',
            surname: 'Ball',
            price: '71K',
            position: 'PG',
            teamColor: '#552583',
            ppg: '24.7',
            img: 'https://nba-players.herokuapp.com/players/ball/lonzo',
            status: 1
        },
        {
            id: 1,
            name: 'Kyrie',
            surname: 'Irving',
            price: '86K',
            position: 'PG',
            teamColor: '#008248',
            ppg: '31.2',
            img: 'https://nba-players.herokuapp.com/players/irving/kyrie',
            status: 1
        },
        {
            id: 2,
            name: 'Jonas',
            surname: 'Valančiūnas',
            price: '69K',
            position: 'C',
            teamColor: '#CD1141',
            ppg: '19.8',
            img: 'https://nba-players.herokuapp.com/players/valanciunas/jonas',
            status: 1
        },
        {
            id: 3,
            name: 'Kawhi',
            surname: 'Leonard',
            price: '84K',
            position: 'SF',
            teamColor: '#C4CED4',
            ppg: '23.8',
            img: 'https://nba-players.herokuapp.com/players/leonard/kawhi',
            status: 1
        },
        {
            id: 4,
            name: 'Dirk',
            surname: 'Nowitzki',
            price: '46K',
            position: 'PF',
            teamColor: '#007DC5',
            ppg: '7.9',
            img: 'https://nba-players.herokuapp.com/players/nowitzki/dirk',
            status: 1
        },
        {
            id: 5,
            name: 'Spencer',
            surname: 'Dinwiddie',
            price: '59K',
            position: 'SG',
            teamColor: '#000000',
            ppg: '16.4',
            img: 'https://nba-players.herokuapp.com/players/dinwiddie/spencer',
            status: 1
        },
        {
            id: 6,
            name: 'Giannis',
            surname: 'Antetokounmpo',
            price: '96K',
            position: 'SF',
            teamColor: '#00471B',
            ppg: '32.7',
            img: 'https://nba-players.herokuapp.com/players/antetokounmpo/giannis',
            status: 1
        }
    ],
    all: function () { return this.players },
    get: function (id) {
        const isPlayer = p => p.id === id
        return this.players.find(isPlayer)
    }
}

export default PlayerAPI
