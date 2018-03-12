import * as React from 'react';
import { Route } from 'react-router-dom';
import { Lineup } from './components/Lineup/Lineup';
import { Header } from './components/Header';
import { InjuriesFeed } from './components/Injuries/InjuriesFeed';
import { Rules } from './components/Rules';

export const routes = <div>
    <Route path='/' component={Header} />
    <Route path='/lineup' component={Lineup} />
    <Route path='/injuries' component={InjuriesFeed} />
    <Route path='/rules' component={Rules} />
</div>;
