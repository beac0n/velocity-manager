import React from 'react';
import {Row, Col, Jumbotron} from 'reactstrap'
import WeekDaysDropDown from './weekDaysDropDown.connected'
import PositiveNumberInput from './positiveNumberInput.connected'

const Header = () => (
    <Jumbotron>
        <h1 className="display-3">Velocity Manager</h1>
        <p className="lead">
            Bitte tragen Sie in die unten stehende Tabelle ein ob die Teammitglieder in Tagen des Sprints verfügbar sind
            oder nicht
        </p>

        <Row>
            <Col xs="4"><WeekDaysDropDown title={'Sprintbeginn'} /></Col>
            <Col xs="4"><PositiveNumberInput title={'Sprintdauer (Wochen)'} /></Col>
            <Col xs="4"><WeekDaysDropDown title={'Sprintende'} /></Col>
        </Row>
    </Jumbotron>)

export default Header