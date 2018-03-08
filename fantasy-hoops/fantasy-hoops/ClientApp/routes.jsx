import * as React from 'react';
import { Route } from 'react-router-dom';
import { Lineup } from './components/Lineup/Lineup';
import { Header } from './components/Header';

export const routes = <div>
    <Route exact path='/' component={Lineup} />
    <Route path='/main' component={Header} />
</div>;
