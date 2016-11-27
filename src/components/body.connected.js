import React from 'react'
import {connect} from 'react-redux'
import {Table} from 'reactstrap'
import {selectors} from '../redux/reducer'

const Body = ({sprintDays, weekDays, sprintStart}) => {
    if(!sprintStart) {
        return null
    }

    const sprintStartIndex = weekDays.indexOf(sprintStart)

    return (
        <Table>
            <thead>
            <tr>
                <th>Benutzer</th>
                <th>{sprintStart}</th>

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
    weekDays: selectors.getWeekDays(state),
    sprintDays: selectors.getSprintDuration(state),
    sprintStart: selectors.getSprintStart(state, 'sprintStart'),
})
const mapActionsToProps = {}
export default connect(mapStateToProps, mapActionsToProps)(Body)