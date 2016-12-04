import React from 'react'
import {connect} from 'react-redux'
import Column from './column.connected'
import {selectors} from '../../redux/reducer'

const DataLine = ({username, sprintDays}) => (
    <tr>
        <th>{username}</th>
        {sprintDays.map((day, index) => (
            <td key={`column-td-${index}`}>
                <Column isPlaceholder={!day.isWorkDay} username={username} id={index}/>
            </td>
        ))}
    </tr>)

const mapStateToProps = (state) => ({
    sprintDays: selectors.getSprintDays(state),
})
export default connect(mapStateToProps)(DataLine)
