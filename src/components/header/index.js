import React from 'react'
import {connect} from 'react-redux'
import {selectors} from '../../redux/reducer'
import {Row, Col, Input, InputGroupButton, Jumbotron} from 'reactstrap'
import WeekDaysDropDownSprintStart from './sprintStartDropDown.connected'
import SprintDurationInput from './sprintDurationInput.connected'

const xs = 12
const sm = 6
const md = 3


export const Header = ({sprintEnd, save, teamName}) => (
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
            <Col xs={xs} sm={sm} md={md}>&zwnj;<InputGroupButton onClick={save} style={{width: '100%'}}>Lokal speichern</InputGroupButton></Col>

        </Row>
    </Jumbotron>)

const mapStateToProps = (state) => ({
    save: () => localStorage && localStorage.setItem && localStorage.setItem('velocity-manager-state', JSON.stringify(state)),
    sprintEnd: selectors.getSprintEndDay(state),
})

export default connect(mapStateToProps)(Header)
