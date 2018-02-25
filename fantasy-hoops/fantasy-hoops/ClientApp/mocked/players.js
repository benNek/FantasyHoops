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
            img: 'https://nba-players.herokuapp.com/players/ball/lonzo'
        },
        {
            id: 1,
            name: 'Kyrie',
            surname: 'Irving',
            price: '86K',
            position: 'PG',
            teamColor: '#008248',
            ppg: '31.2',
            img: 'https://nba-players.herokuapp.com/players/irving/kyrie'
        },
        {
            id: 2,
            name: 'Jonas',
            surname: 'Valančiūnas',
            price: '69K',
            position: 'C',
            teamColor: '#CD1141',
            ppg: '19.8',
            img: 'https://nba-players.herokuapp.com/players/valanciunas/jonas'
        }
    ],
    all: function () { return this.players },
    get: function (id) {
        const isPlayer = p => p.id === id
        return this.players.find(isPlayer)
    }
}

export default PlayerAPI
