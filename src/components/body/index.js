import React from 'react'
import {connect} from 'react-redux'
import useSheet from 'react-jss'
import classNames from 'classnames'
import {Table, Container} from 'reactstrap'
import {selectors} from '../../redux/reducer'
import {actions} from '../../redux/actions'
import DataLine from './dataLine.connected'
import NewUserLine from './newUserLine.connected'

const style = {
    weekDay: {minWidth: 150},
    asSmallAsPossible: {width: 1}
}

const Body = ({users = [], sprintDays, sheet}) => {
    const {asSmallAsPossible, weekDay} = sheet.classes

    const columns = sprintDays.map((day, index) => (
        <th className={classNames(day.isWorkDay ? weekDay : asSmallAsPossible)} key={`headColumns-${index}`}>{day.key}</th>))

    return (
        <Container fluid>
            <Table size="sm" style={{borderCollapse: 'collapsebord'}}>
                <thead>
                <tr>
                    <th className={asSmallAsPossible}>Benutzer</th>
                    {columns}
                </tr>
                </thead>
                <tbody>
                {users.map((username, index) => <DataLine lastOne={index === users.length - 1} username={username} key={`dataLine-${index}`}/>)}
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
