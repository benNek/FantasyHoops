import * as React from 'react';
import { Route } from 'react-router-dom';
import { Lineup } from './components/Lineup/Lineup';
import { Header } from './components/Header';
import { InjuriesFeed } from './components/Injuries/InjuriesFeed';
import { UserProfile } from './components/UserProfile';

export const routes = <div>
    <Route path='/profile' component={UserProfile} />
    <Route path='/' component={Header} />
    <Route path='/lineup' component={Lineup} />
    <Route path='/injuries' component={InjuriesFeed} />
</div>;
