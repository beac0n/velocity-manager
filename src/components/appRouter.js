import React from 'react'
import {Router, IndexRoute, Redirect, Route, browserHistory} from 'react-router'
import App from './app'
import TeamSelector from './teamSelector/teamSelector'

window.__VELOCITY_MANAGER_GLOBALS__ = {
    startPath: window.location.pathname
}

const Wrapper = ({children}) => <div>{children}</div>

const AppRouter = () => {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={Wrapper}>
                <IndexRoute component={TeamSelector}/>
                <Route path="teams/:teamName" component={App}/>
            </Route>

        </Router>)
}

export default AppRouter
