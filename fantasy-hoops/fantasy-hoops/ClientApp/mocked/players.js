const PlayerAPI = {
    players: [
        {
            id: 0,
            name: 'Lonzo',
            surname: 'Ball',
            price: '71k',
            position: 'PG',
            teamColor: '#552583',
            img: 'https://nba-players.herokuapp.com/players/ball/lonzo'
        },
        {
            id: 1,
            name: 'Kyrie',
            surname: 'Irving',
            price: '86k',
            position: 'PG',
            teamColor: '#008248',
            img: 'https://nba-players.herokuapp.com/players/irving/kyrie'
        },
        {
            id: 2,
            name: 'Jonas',
            surname: 'Valančiūnas',
            price: '69k',
            position: 'C',
            teamColor: '#CD1141',
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
