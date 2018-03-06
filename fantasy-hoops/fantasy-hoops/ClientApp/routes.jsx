import * as React from 'react';
import { Route } from 'react-router-dom';
import { PlayerCard } from './components/PlayerCard';
import { Lineup } from './components/Lineup';

export const routes = <div>
    <Route exact path='/' component={Lineup} />
</div>;
