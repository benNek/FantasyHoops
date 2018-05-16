import * as React from 'react';
import { Route } from 'react-router-dom';
import { PrivateRoute } from './components/Authentication/PrivateRoute';
import { Lineup } from './components/Lineup/Lineup';
import { Header } from './components/Header';
import { InjuriesFeed } from './components/Injuries/InjuriesFeed';
import { Registration } from './components/Authentication/Registration';
import { UserProfile } from './components/Profile/UserProfile';
import { Rules } from './components/Rules';
import { Login } from './components/Authentication/Login'
import { NewsFeed } from './components/News/NewsFeed';
import { UserLeaderboard } from './components/Leaderboard/UserLeaderboard';
import { PlayerLeaderboard } from './components/Leaderboard/PlayerLeaderboard';
import { UserPool } from './components/UserPool';
import { Main } from './components/Main';
import { AllNotifications} from './components/Notifications/AllNotifications';

export const routes = <div>
  <Route path='/' component={Header} />
  <Route exact path='/' component={Main} />
  <Route exact path='/login' component={Login} />
  <Route exact path='/register' component={Registration} />
  <PrivateRoute path='/profile/:name?/:edit?' component={UserProfile} />
  <PrivateRoute path='/lineup' component={Lineup} />
  <Route path='/injuries' component={InjuriesFeed} />
  <Route path='/rules' component={Rules} />
  <Route path='/news' component={NewsFeed} />
  <PrivateRoute exact path='/leaderboard/users' component={UserLeaderboard} />
  <PrivateRoute exact path='/leaderboard/players' component={PlayerLeaderboard} />
  <PrivateRoute path='/users' component={UserPool} />
  <PrivateRoute path='/notifications' component={AllNotifications} />
</div>;
