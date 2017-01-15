import React from 'react'
import {Router, Redirect, Route, browserHistory} from 'react-router'
import App from './app'
import TeamSelector from './teamSelector/teamSelector'

window.__VELOCITY_MANAGER_GLOBALS__ = {
    startPath: window.location.pathname
}


const AppRouter = () => {


    return (
        <Router history={browserHistory}>
            <Route path="/" component={TeamSelector} />
            <Route path="app/:teamName" component={App}/>
            <Redirect from="*" to="/" />
        </Router>)
}

export default AppRouter
