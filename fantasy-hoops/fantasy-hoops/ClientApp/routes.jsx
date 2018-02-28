import * as React from 'react';
import { Route } from 'react-router-dom';
import { Counter } from './components/Counter';
import { PlayerCard } from './components/PlayerCard';
import { Lineup } from './components/Lineup';

export const routes = <div>
    <Route exact path='/' component={Counter} />
    <Route path='/cards/:id' component={PlayerCard} />
    <Route path='/lineup' component={Lineup} />
</div>;
