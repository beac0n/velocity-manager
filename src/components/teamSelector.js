import React from 'react'
import {Row, Col, Container, Button, Jumbotron} from 'reactstrap'
import {browserHistory} from 'react-router'

const teamNames = ['Spartans', 'Minions']

const TeamSelector = () => (
    <div>
        <Jumbotron>
            <h1 className="display-3">Velocity Manager</h1>
            <p className="lead">Bitte wählen Sie das Team aus, welches Sie bearbeiten möchten.</p>
        </Jumbotron>
        <Container fluid>
            {teamNames.map((teamName) => (
                <Row style={{marginBottom: 10}}>
                    <Col>
                        <Button size="lg" block onClick={() => browserHistory.push(`/app/${teamName}`)}>
                            {teamName}
                        </Button>
                    </Col>
                </Row>
            ))}
        </Container>
    </div>)

export default TeamSelector