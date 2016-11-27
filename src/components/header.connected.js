import React from 'react'
import {connect} from 'react-redux'
import {selectors} from '../redux/reducer'
import {Row, Col, FormGroup, Input, Jumbotron} from 'reactstrap'
import WeekDaysDropDownSprintStart from './weekDaysDropDown/weekDaysDropDown.sprintStart.connected'
import PositiveNumberInput from './positiveNumberInput.connected'

const Header = ({sprintEnd}) => (
    <Jumbotron>
        <h1 className="display-3">Velocity Manager</h1>
        <p className="lead">
            Bitte tragen Sie in die unten stehende Tabelle ein ob die Teammitglieder in Tagen des Sprints verfügbar sind
            oder nicht
        </p>

        <Row>
            <Col xs="4"><WeekDaysDropDownSprintStart title={'Sprintbeginn'} /></Col>
            <Col xs="4"><PositiveNumberInput title={'Sprintdauer (Tage)'} /></Col>
            <Col xs="4">
                <FormGroup>
                    Sprintende:
                    <Input disabled={true} value={sprintEnd} />
                </FormGroup>
            </Col>
        </Row>
    </Jumbotron>)

const mapStateToProps = (state) => ({
    sprintEnd: selectors.getSprintEnd(state),
})
export default connect(mapStateToProps)(Header)