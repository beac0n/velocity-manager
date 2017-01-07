import React from 'react'
import {connect} from 'react-redux'
import {selectors} from '../../redux/reducer'
import {Row, Col, Input, Jumbotron} from 'reactstrap'
import WeekDaysDropDownSprintStart from './sprintStartDropDown.connected'
import SprintDurationInput from './sprintDurationInput.connected'

const xs = 12
const sm = 4


export const Header = ({sprintEnd, save, teamName}) => (
    <Jumbotron>
        <h1 className="display-3">Velocity Manager</h1>
        <p className="lead">
            Bitte tragen Sie in die unten stehende Tabelle ein ob die Teammitglieder
            des Teams "{teamName}" in Tagen des Sprints verfügbar sind oder nicht.
        </p>

        <Row>
            <Col xs={xs} sm={sm}>Sprintbeginn:<WeekDaysDropDownSprintStart /></Col>
            <Col xs={xs} sm={sm}>Sprintdauer (Tage):<SprintDurationInput /></Col>
            <Col xs={xs} sm={sm}>Sprintende:<Input disabled={true} value={sprintEnd}/></Col>
        </Row>
    </Jumbotron>)

const mapStateToProps = (state) => ({
    sprintEnd: selectors.getSprintEndDay(state),
})

export default connect(mapStateToProps)(Header)
