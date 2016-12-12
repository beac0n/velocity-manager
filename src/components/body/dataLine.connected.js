import React from 'react'
import {connect} from 'react-redux'
import Column from './column/index'
import {selectors} from '../../redux/reducer'

const DataLine = ({username, sprintDays, lastOne}) => (
    <tr style={{borderBottom: lastOne ? undefined : '2px solid black'}}>
        <th>{username}</th>
        {sprintDays.map((day, index) => (
            <td key={`column-td-${index}`}>
                <Column isPlaceholder={!day.isWorkDay} username={username} id={String(index)}/>
            </td>
        ))}
    </tr>)

const mapStateToProps = (state) => ({
    sprintDays: selectors.getSprintDays(state),
})
export default connect(mapStateToProps)(DataLine)
