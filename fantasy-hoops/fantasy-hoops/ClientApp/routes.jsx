import * as React from 'react';
import { Route } from 'react-router-dom';
import { Lineup } from './components/Lineup/Lineup';
import { Header } from './components/Header';
import { InjuriesFeed } from './components/Injuries/InjuriesFeed';
import { Registration } from './components/Authentication/Registration';
import { UserProfile } from './components/Profile/UserProfile';
import { Rules } from './components/Rules';
import { Login } from './components/Authentication/Login'

export const routes = <div>
    <Route path='/' component={Header} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/register' component={Registration} />
    <Route path='/profile/:edit?' component={UserProfile} />
    <Route path='/lineup' component={Lineup} />
    <Route path='/injuries' component={InjuriesFeed} />
    <Route path='/rules' component={Rules} />
</div>;
