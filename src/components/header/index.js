import React from 'react'
import {connect} from 'react-redux'
import {selectors} from '../../redux/reducer'
import {Row, Col, Input, InputGroupButton, Jumbotron} from 'reactstrap'
import WeekDaysDropDownSprintStart from './sprintStartDropDown.connected'
import SprintDurationInput from './sprintDurationInput.connected'

const xs = 3

export const Header = ({sprintEnd, save}) => (
    <Jumbotron>
        <h1 className="display-3">Velocity Manager</h1>
        <p className="lead">
            Bitte tragen Sie in die unten stehende Tabelle ein ob die Teammitglieder in Tagen des Sprints verfügbar sind
            oder nicht
        </p>

        <Row>
            <Col xs={xs}>Sprintbeginn:<WeekDaysDropDownSprintStart /></Col>
            <Col xs={xs}>Sprintdauer (Tage):<SprintDurationInput /></Col>
            <Col xs={xs}>Sprintende:<Input disabled={true} value={sprintEnd}/></Col>
            <Col xs={xs}>&zwnj;<InputGroupButton onClick={save}>Speichern</InputGroupButton></Col>
        </Row>
    </Jumbotron>)

const mapStateToProps = (state) => ({
    save: () => localStorage && localStorage.setItem && localStorage.setItem('velocity-manager-state', JSON.stringify(state)),
    sprintEnd: selectors.getSprintEndDay(state),
})

export default connect(mapStateToProps)(Header)
