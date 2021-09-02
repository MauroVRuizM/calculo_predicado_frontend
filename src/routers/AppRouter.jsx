import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Checks } from '../components/Checks';
import { Facts } from '../components/Facts';
import { FactsList } from '../components/FactsList';
import { Navbar } from '../components/Navbar';
import { Rules } from '../components/Rules';
import { RulesList } from '../components/RulesList';

export const AppRouter = () => {
    return (
        <Router>
            <Navbar/>
            <div>
                <Switch>
                    <Route exact path="/facts" component={ Facts } />
                    <Route path="/rules" component={ Rules } />
                    <Route path="/list/rules" component={ RulesList } />
                    <Route path="/list/facts" component={ FactsList } />
                    <Route path="/checks" component={ Checks } />
                    <Redirect to="/facts" />
                </Switch>
            </div>
        </Router>
    )
}
