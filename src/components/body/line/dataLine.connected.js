import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button} from 'reactstrap'
import octicons from 'octicons'
import Column from './column/index'
import {selectors} from '../../../redux/reducer'
import {actions} from '../../../redux/actions'

export const DataLine = ({username, sprintDays = [], velocity, removeUser}) => (
    <tr>
        <th>
            <p>{username}</p>
            <p>Velocity (PT): {velocity}</p>
            <p>
                <Button
                    style={{width: '100%'}}
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

DataLine.propTypes = {
    username: React.PropTypes.string,
    sprintDays: React.PropTypes.array,
    velocity: React.PropTypes.number,
    removeUser: React.PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
    sprintDays: selectors.getSprintDays(state),
    velocity: selectors.getUserVelocity(state, ownProps.username),
})

const mapActionsToProps = (dispatch, ownProps) => (
    bindActionCreators({
        removeUser: () => actions.removeUser(ownProps.username),
    }, dispatch))

export default connect(mapStateToProps, mapActionsToProps)(DataLine)
