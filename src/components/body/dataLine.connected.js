import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button} from 'reactstrap'
import octicons from 'octicons'
import Column from './column/index'
import {selectors} from '../../redux/reducer'
import {actions} from '../../redux/actions'

export const DataLine = ({username, sprintDays, lastOne, removeUser}) => (
    <tr style={{borderBottom: lastOne ? undefined : '2px solid black'}}>
        <th>
            <p>{username}</p>
            <p>
                <Button 
                    dangerouslySetInnerHTML={{__html: octicons.trashcan.toSVG()}}
                    onClick={removeUser}
                />
            </p>
        </th>
        {sprintDays.map((day, index) => (
            <td key={`column-td-${index}`}>
                <Column isPlaceholder={!day.isWorkDay} username={username} id={String(index)}/>
            </td>
        ))}
    </tr>)

const mapStateToProps = (state) => ({sprintDays: selectors.getSprintDays(state)})
const mapActionsToProps = (dispatch, ownProps) => {
    const {username} = ownProps
    return bindActionCreators({
        removeUser: () => actions.removeUser(username),
    }, dispatch)
}
export default connect(mapStateToProps, mapActionsToProps)(DataLine)
