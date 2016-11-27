import React from 'react'
import {connect} from 'react-redux'
import {Table} from 'reactstrap'
import {selectors} from '../redux/reducer'

const Body = ({sprintWeeks, sprintStart, sprintEnd}) => {
    if(!sprintStart || !sprintEnd) {
        return null
    }

    return (
        <Table>
            <thead>
            <tr>
                <th>Benutzer</th>
                <th>{sprintStart}</th>
                <th>Dienstag</th>
                <th>Mittwoch</th>
                <th>Donnerstag</th>
                <th>Freitag</th>
                <th>Samstag</th>
                <th>{sprintEnd}</th>
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
        </Table>)
}

const mapStateToProps = (state) => ({
    sprintStart: selectors.getSprintBoundary(state, 'sprintStart'),
    sprintEnd: selectors.getSprintBoundary(state, 'sprintEnd'),
})
const mapActionsToProps = {}
export default connect(mapStateToProps, mapActionsToProps)(Body)