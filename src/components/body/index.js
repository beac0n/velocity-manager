import React from 'react'
import {connect} from 'react-redux'
import useSheet from 'react-jss'
import classNames from 'classnames'
import {Table, Container} from 'reactstrap'
import {selectors} from '../../redux/reducer'
import {actions} from '../../redux/actions'
import DataLine from './line/dataLine'
import NewUserLine from './line/newUserLine.connected'

const style = {
    weekDay: {minWidth: 63},
    asSmallAsPossible: {width: 1}
}

export const Body = ({users = [], sprintDays, sheet}) => {
    const {asSmallAsPossible, weekDay} = sheet.classes

    const columns = sprintDays.map((day, index) => (
        <th className={classNames(day.isWorkDay ? weekDay : asSmallAsPossible)}
            key={`headColumns-${index}`}>{day.key}</th>))

    return (
        <Container fluid style={{paddingBottom: 10}}>
            {
                users.map((username, index) => (
                    <Table size="sm" className={asSmallAsPossible} style={{float: 'left'}}>
                        <thead>
                        <tr>
                            <th className={asSmallAsPossible}>Benutzer</th>
                            {columns}
                        </tr>
                        </thead>
                        <tbody>
                        <DataLine username={username} key={`dataLine-${index}`}/>
                        </tbody>
                    </Table>))
            }
            <div style={{clear: 'both'}} />
            <NewUserLine columnsCount={columns.length + 1}/>
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
