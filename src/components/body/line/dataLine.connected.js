import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button} from 'reactstrap'
import octicons from 'octicons'
import Column from './column/index'
import {selectors} from '../../../redux/reducer'
import {actions} from '../../../redux/actions'

export const DataLine = ({user = {}, sprintDays = [], velocity, removeUser}) => (
    <tr>
        <th>
            <p>{user.name}</p>
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
                <Column isPlaceholder={!day.isWorkDay} userId={user.id} id={String(index)}/>
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
    velocity: selectors.getUserVelocity(state, ownProps.user.id),
})

const mapActionsToProps = (dispatch, ownProps) => (
    bindActionCreators({
        removeUser: () => actions.removeUser(ownProps.user.id),
    }, dispatch))

export default connect(mapStateToProps, mapActionsToProps)(DataLine)
