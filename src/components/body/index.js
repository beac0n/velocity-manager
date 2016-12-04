import React from 'react'
import shortId from 'shortid'
import {connect} from 'react-redux'
import useSheet from 'react-jss'
import {Table, Container} from 'reactstrap'
import {selectors} from '../../redux/reducer'
import {actions} from '../../redux/actions'
import DataLine from './dataLine.connected'
import NewUserLine from './newUserLine'

const columnWidth = 110
const style = {
    weekDay: {minWidth: columnWidth},
    weekEnd: {minWidth: columnWidth / 2},
}

const Body = ({users = [], sprintDays, sheet}) => {
    const {weekDay, weekEnd} = sheet.classes

    const columns = sprintDays.map((day) => (
        <th className={day.isWorkDay ? weekDay : weekEnd} key={shortId.generate()}>
            {day.key}
        </th>))

    return (
        <Container fluid>
            <Table size="sm">
                <thead>
                <tr>
                    <th>Benutzer</th>
                    {columns}
                </tr>
                </thead>
                <tbody>
                {users.map((username, index) => <DataLine username={username} key={'DataLine' + index}/>)}
                <NewUserLine columnsCount={columns.length + 1}/>
                </tbody>
            </Table>
        </Container>)
}

const mapStateToProps = (state) => ({
    sprintDays: selectors.getSprintDays(state),
    users: selectors.getUsers(state)
})
const mapActionsToProps = {
    addUser: actions.addUser,
}
export default connect(mapStateToProps, mapActionsToProps)(useSheet(style)(Body))
