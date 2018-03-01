const PlayerAPI = {
  players: [
    {
      id: 1628366,
      name: 'Lonzo',
      surname: 'Ball',
      price: '71K',
      position: 'PG',
      teamColor: '#552583',
      ppg: '24.7',
      selected: false
    },
    {
      id: 202681,
      name: 'Kyrie',
      surname: 'Irving',
      price: '86K',
      position: 'PG',
      teamColor: '#008248',
      ppg: '31.2',
      selected: false
    },
    {
      id: 202685,
      name: 'Jonas',
      surname: 'Valančiūnas',
      price: '69K',
      position: 'C',
      teamColor: '#CD1141',
      ppg: '19.8',
      selected: false
    },
    {
      id: 202695,
      name: 'Kawhi',
      surname: 'Leonard',
      price: '84K',
      position: 'SF',
      teamColor: '#C4CED4',
      ppg: '23.8',
      selected: false
    },
    {
      id: 1717,
      name: 'Dirk',
      surname: 'Nowitzki',
      price: '46K',
      position: 'PF',
      teamColor: '#007DC5',
      ppg: '7.9',
      selected: false
    },
    {
      id: 203915,
      name: 'Spencer',
      surname: 'Dinwiddie',
      price: '59K',
      position: 'SG',
      teamColor: '#000000',
      ppg: '16.4',
      selected: false
    },
    {
      id: 203507,
      name: 'Giannis',
      surname: 'Antetokounmpo',
      price: '96K',
      position: 'SF',
      teamColor: '#00471B',
      ppg: '32.7',
      selected: false
    },
    {
      id: 203145,
      name: 'Kent',
      surname: 'Bazemore',
      price: '26K',
      position: 'SG',
      teamColor: '#E03A3E',
      ppg: '12.7',
      selected: false
    },
    {
      id: 2544,
      name: 'LeBron',
      surname: 'James',
      price: '97K',
      position: 'SF',
      teamColor: '#6F2633',
      ppg: '36.2',
      selected: false
    },
    {
      id: 201567,
      name: 'Kevin',
      surname: 'Love',
      price: '67K',
      position: 'PF',
      teamColor: '#6F2633',
      ppg: '22.2',
      selected: false
    },
    {
      id: 1627734,
      name: 'Domantas',
      surname: 'Sabonis',
      price: '45K',
      position: 'PF',
      teamColor: '#002D62',
      ppg: '16.9',
      selected: false
    },
    {
      id: 2730,
      name: 'Dwight',
      surname: 'Howard',
      price: '49K',
      position: 'C',
      teamColor: '#1D1160',
      ppg: '18.2',
      selected: false
    },
    {
      id: 203897,
      name: 'Zach',
      surname: 'Lavine',
      price: '72K',
      position: 'SG',
      teamColor: '#CE1141',
      ppg: '26.5',
      selected: false
    },
    {
      id: 203999,
      name: 'Nikola',
      surname: 'Jokic',
      price: '91K',
      position: 'C',
      teamColor: '#00285E',
      ppg: '34.2',
      selected: false
    },
    {
      id: 201939,
      name: 'Stephen',
      surname: 'Curry',
      price: '92K',
      position: 'PG',
      teamColor: '#243E90',
      ppg: '32.2',
      selected: false
    },
    {
      id: 101108,
      name: 'Chris',
      surname: 'Paul',
      price: '76K',
      position: 'PG',
      teamColor: '#CE1141',
      ppg: '26.4',
      selected: false
    },
    {
      id: 201566,
      name: 'Russell',
      surname: 'Westbrook',
      price: '88K',
      position: 'PG',
      teamColor: '#007AC1',
      ppg: '30.1',
      selected: false
    },
    {
      id: 203081,
      name: 'Damian',
      surname: 'Lillard',
      price: '72K',
      position: 'PG',
      teamColor: '#E13A3E',
      ppg: '25.6',
      selected: false
    }
  ],
  all: function () { return this.players },
  get: function (id) {
    const isPlayer = p => p.id === id
    return this.players.find(isPlayer)
  }
}

export default PlayerAPI
