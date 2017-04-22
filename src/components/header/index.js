import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {selectors} from '../../redux/reducer'
import {Row, Col, Input, Jumbotron, Button} from 'reactstrap'
import WeekDaysDropDownSprintStart from './sprintStartDropDown.connected'
import SprintDurationInput from './sprintDurationInput.connected'

const xs = 12
const sm = 6
const md = 3

export const Header = ({sprintEnd, save, teamName, router}) => (
    <Jumbotron>
        <h1 className="display-3">Velocity Manager</h1>
        <p className="lead">
            Bitte tragen Sie in die unten stehende Tabelle ein ob die Teammitglieder
            des Teams "{teamName}" in Tagen des Sprints verfügbar sind oder nicht.
        </p>

        <Row>
            <Col xs={xs} sm={sm} md={md}>Sprintbeginn:<WeekDaysDropDownSprintStart /></Col>
            <Col xs={xs} sm={sm} md={md}>Sprintdauer (Tage):<SprintDurationInput /></Col>
            <Col xs={xs} sm={sm} md={md}>Sprintende:<Input disabled={true} value={sprintEnd}/></Col>
        </Row>
        <Row>
            <Col xs={xs} sm={sm} md={md}>
                &nbsp;
                <Button block onClick={() => router.push('/velocity-manager')}>Zur Teamauswahl</Button>
            </Col>
        </Row>
    </Jumbotron>)

Header.propTypes = {
    sprintEnd: React.PropTypes.string,
    save: React.PropTypes.func,
    teamName: React.PropTypes.string,
}

const mapStateToProps = (state) => ({
    sprintEnd: selectors.getSprintEndDay(state),
})

export default withRouter(connect(mapStateToProps)(Header))
