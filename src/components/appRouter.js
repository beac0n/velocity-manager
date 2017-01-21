import React from 'react'
import {Router, IndexRoute, Redirect, Route, browserHistory} from 'react-router'
import App from './app'
import TeamSelector from './teamSelector/teamSelector.connected'

const AppRouter = () => {
    return (
        <Router history={browserHistory}>
            <Route path="/velocity-manager">
                <IndexRoute component={TeamSelector}/>
                <Route path="teams/:teamName" component={App}/>
            </Route>
            <Redirect from="*" to="/velocity-manager" />
        </Router>)
}

export default AppRouter
