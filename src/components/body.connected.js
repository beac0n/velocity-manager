import React from 'react'
import {connect} from 'react-redux'
import {Table} from 'reactstrap'
import {selectors} from '../redux/reducer'

const Body = ({sprintWeeks, sprintStart, sprintEnd}) => (
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
            <td>{sprintStart}</td>
            <td>{sprintEnd}</td>
        </tr>
        </tbody>
    </Table>)

const mapStateToProps = (state) => ({
    sprintStart: selectors.getSprintBoundary(state, 'sprintStart'),
    sprintEnd: selectors.getSprintBoundary(state, 'sprintEnd'),
})
const mapActionsToProps = {
}
export default connect(mapStateToProps, mapActionsToProps)(Body)