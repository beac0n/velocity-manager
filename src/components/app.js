import React from 'react'
import Header from './header'
import Body from './body'

const App = ({params}) => (
    <div>
        <Header teamName={params.teamName} />
        <Body />
    </div>)

export default App