import * as React from 'react';
import { Route } from 'react-router-dom';
import { Counter } from './components/Counter';

export const routes = <div>
    <Route exact path='/' component={ Counter } />
</div>;
