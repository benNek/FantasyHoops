import * as React from 'react';
import { Route } from 'react-router-dom';
import { Lineup } from './components/Lineup/Lineup';

export const routes = <div>
    <Route exact path='/' component={Lineup} />
</div>;
