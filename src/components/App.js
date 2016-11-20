import React from 'react';
import {Container, Row, Col, Jumbotron, Table, FormGroup, Input} from 'reactstrap';
import WeekDaysDropDown from './weekDaysDropDown'

const PositiveNumberInput = ({title}) => (
    <FormGroup>
        <Input onChange={() => {console.log('CHANGE!')}} type="number" value="100" placeholder={title}/>
    </FormGroup>)
const App = ({isStartSprintDropDownOpen, isEndSprintDropDownOpen, toggle}) => (
    <Container>
        <Jumbotron>
            <h1 className="display-3">Velocity Manager</h1>
            <p className="lead">
                Bitte tragen Sie in die unten stehende Tabelle ein ob die Teammitglieder in
                Tagen des Sprints verfügbar sind oder nicht
            </p>

            <Row>
                <Col xs="6" sm="4"><WeekDaysDropDown title={'Sprintbeginn'}/></Col>
                <Col xs="6" sm="4"><PositiveNumberInput title={'Sprintdauer (Wochen)'} />
                </Col>
                <Col xs="6" sm="4"><WeekDaysDropDown title={'Sprintende'}/></Col>
            </Row>
        </Jumbotron>

        <Table>
            <thead>
            <tr>
                <th>Benutzer</th>
                <th>Montag</th>
                <th>Dienstag</th>
                <th>Mittwoch</th>
                <th>Donnerstag</th>
                <th>Freitag</th>
                <th>Samstag</th>
                <th>Sonntag</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Max</td>
                <td>FULL</td>
                <td>X</td>
                <td>/</td>
                <td>FULL</td>
                <td>FULL</td>
                <td>X</td>
                <td>X</td>
            </tr>
            </tbody>
        </Table>
    </Container>)


export default App
