import * as React from 'react';
import { Route } from 'react-router-dom';
import { Counter } from './components/Counter';
import { PlayerCard } from './components/PlayerCard';

export const routes = <div>
    <Route exact path='/' component={Counter} />
    <Route path='/cards/:id' component={PlayerCard} />
</div>;
