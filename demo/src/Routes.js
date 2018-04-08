import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Home from './containers/Home';
import NewProposal from './containers/NewProposal';
import ProposalDetail from './containers/ProposalDetail';
import Proposals from './containers/Proposals';
import Results from './containers/Results';
import withLayout from './containers/Layout';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={withLayout(Home)} />
            <Route path="/newproposal" component={withLayout(NewProposal)} />
            <Route path="/proposaldetail/:proposalId" component={withLayout(ProposalDetail)} />
            <Route path="/proposals" component={withLayout(Proposals)} />     
            <Route path="/results" component={withLayout(Results)} />            
            <Route component={Home} />
        </Switch>
    </Router>
)

export default Routes;