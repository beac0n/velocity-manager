import React from 'react'
import {connect} from 'react-redux'
import shortId from 'shortid'
import Column from './column.connected'
import {selectors} from '../../redux/reducer'

const DataLine = ({username, sprintDays}) => (
    <tr>
        <th>{username}</th>
        {sprintDays.map((day, index) => (
            <td key={shortId.generate()}>
                <Column isPlaceholder={!day.isWorkDay} id={'Column' + index}/>
            </td>
        ))}
    </tr>)

const mapStateToProps = (state) => ({
    sprintDays: selectors.getSprintDays(state),
})
export default connect(mapStateToProps)(DataLine)
