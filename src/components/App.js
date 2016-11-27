import React from 'react'
import {Container} from 'reactstrap'
import Header from './header.connected'
import Body from './body.connected'

const App = () => (
    <Container fluid>
        <Header />
        <Body />
    </Container>)

export default App
