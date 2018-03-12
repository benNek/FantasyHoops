import * as React from 'react';
import { Route } from 'react-router-dom';
import { Lineup } from './components/Lineup/Lineup';
import { Header } from './components/Header';
import { InjuriesFeed } from './components/Injuries/InjuriesFeed';
import { Registration } from './components/Authentication/Registration';

export const routes = <div>
    <Route path='/' component={Header} />
    <Route exact path='/register' component={Registration} />
    <Route path='/lineup' component={Lineup} />
    <Route path='/injuries' component={InjuriesFeed} />
</div>;
