import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import App from './app'
import TeamSelector from './teamSelector/teamSelector'

const AppRouter = () => (
    <Router history={browserHistory}>
        <Route path="./app/:teamName" component={App}/>
        <Route path="*" component={TeamSelector} />
    </Router>)

export default AppRouter
