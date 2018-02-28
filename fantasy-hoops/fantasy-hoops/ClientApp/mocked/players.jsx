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
        },
        {
            id: 7,
            name: 'Kent',
            surname: 'Bazemore',
            price: '26K',
            position: 'SG',
            teamColor: '#E03A3E',
            ppg: '12.7',
            img: 'https://nba-players.herokuapp.com/players/bazemore/kent',
            status: 1
        },
        {
            id: 8,
            name: 'Lebron',
            surname: 'James',
            price: '97K',
            position: 'SF',
            teamColor: '#6F2633',
            ppg: '36.2',
            img: 'https://nba-players.herokuapp.com/players/james/lebron',
            status: 1
        },
        {
            id: 9,
            name: 'Kevin',
            surname: 'Love',
            price: '67K',
            position: 'PF',
            teamColor: '#6F2633',
            ppg: '22.2',
            img: 'https://nba-players.herokuapp.com/players/love/kevin',
            status: 1
        },
        {
            id: 10,
            name: 'Domantas',
            surname: 'Sabonis',
            price: '45K',
            position: 'PF',
            teamColor: '#002D62',
            ppg: '16.9',
            img: 'https://nba-players.herokuapp.com/players/sabonis/domantas',
            status: 1
        },
        {
            id: 11,
            name: 'Dwight',
            surname: 'Howard',
            price: '49K',
            position: 'C',
            teamColor: '#1D1160',
            ppg: '18.2',
            img: 'https://nba-players.herokuapp.com/players/howard/dwight',
            status: 1
        },
        {
            id: 12,
            name: 'Zach',
            surname: 'Lavine',
            price: '72K',
            position: 'SG',
            teamColor: '#CE1141',
            ppg: '26.5',
            img: 'https://nba-players.herokuapp.com/players/lavine/zach',
            status: 1
        },
        {
            id: 13,
            name: 'Nikola',
            surname: 'Jokic',
            price: '91K',
            position: 'C',
            teamColor: '#00285E',
            ppg: '34.2',
            img: 'https://nba-players.herokuapp.com/players/jokic/nikola',
            status: 1
        },
        {
            id: 14,
            name: 'Stephen',
            surname: 'Curry',
            price: '92K',
            position: 'PG',
            teamColor: '#243E90',
            ppg: '32.2',
            img: 'https://nba-players.herokuapp.com/players/curry/stephen',
            status: 1
        },
        {
            id: 15,
            name: 'Chris',
            surname: 'Paul',
            price: '76K',
            position: 'PG',
            teamColor: '#CE1141',
            ppg: '26.4',
            img: 'https://nba-players.herokuapp.com/players/paul/chris',
            status: 1
        },
        {
            id: 16,
            name: 'Russell',
            surname: 'Westbrook',
            price: '88K',
            position: 'PG',
            teamColor: '#007AC1',
            ppg: '30.1',
            img: 'https://nba-players.herokuapp.com/players/westbrook/russell',
            status: 1
        },
        {
            id: 17,
            name: 'Damian',
            surname: 'Lillard',
            price: '72K',
            position: 'PG',
            teamColor: '#E13A3E',
            ppg: '25.6',
            img: 'https://nba-players.herokuapp.com/players/lillard/damian',
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
