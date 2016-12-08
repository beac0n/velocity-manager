import React from 'react'
import {connect} from 'react-redux'
import {selectors} from '../../redux/reducer'
import {Row, Col, Input, InputGroupButton, Jumbotron} from 'reactstrap'
import WeekDaysDropDownSprintStart from './sprintStartDropDown.connected'
import SprintDurationInput from './sprintDurationInput.connected'

const Header = ({sprintEnd}) => (
    <Jumbotron>
        <h1 className="display-3">Velocity Manager</h1>
        <p className="lead">
            Bitte tragen Sie in die unten stehende Tabelle ein ob die Teammitglieder in Tagen des Sprints verfügbar sind
            oder nicht
        </p>

        <Row>
            <Col xs="3">Sprintbeginn:<WeekDaysDropDownSprintStart /></Col>
            <Col xs="3">Sprintdauer (Tage):<SprintDurationInput minValue="1" maxValue="14" /></Col>
            <Col xs="3">Sprintende:<Input disabled={true} value={sprintEnd}/></Col>
            <Col xs="3">&zwnj;<InputGroupButton>Speichern</InputGroupButton></Col>
        </Row>
    </Jumbotron>)

const mapStateToProps = (state) => ({
    sprintEnd: selectors.getSprintEnd(state),
})

export default connect(mapStateToProps)(Header)
