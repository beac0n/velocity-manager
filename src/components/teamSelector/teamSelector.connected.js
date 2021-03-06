import React from 'react'
import {connect} from 'react-redux'
import {Row, Col, Container, Button, Jumbotron} from 'reactstrap'
import {withRouter} from 'react-router'
import {selectors} from '../../redux/reducer'
import {actions} from '../../redux/actions'
import NewTeamInput from './newTeamInput.connected'

export const TeamSelector = ({teams = [], addTeam, router}) => (
    <div>
        <Jumbotron>
            <h1 className="display-3">Velocity Manager</h1>
            <p className="lead">Bitte wählen Sie das Team aus, welches Sie bearbeiten möchten.</p>
        </Jumbotron>
        <Container fluid>

            {teams.map((team, index) => (
                <Row key={`${team}-${index}`} style={{marginBottom: 10}}>
                    <Col sm="12">
                        <Button size="lg" block onClick={() => router.push(`/velocity-manager/teams/${team.name}`)}>
                            {team.name}
                        </Button>
                    </Col>
                </Row>
            ))}

            <Row style={{marginBottom: 10}}>
                <Col sm="12">
                    <NewTeamInput />
                </Col>
            </Row>

        </Container>
    </div>)


const mapStateToProps = (state) => ({
    teams: selectors.getTeams(state)
})
const mapActionsToProps = {
    addTeam: actions.addTeam
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(TeamSelector))