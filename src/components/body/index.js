import React from 'react'
import {connect} from 'react-redux'
import useSheet from 'react-jss'
import classNames from 'classnames'
import {Table, Container, Alert, Popover} from 'reactstrap'
import {selectors} from '../../redux/reducer'
import {actions} from '../../redux/actions'
import DataLine from './line/dataLine'
import NewUserLine from './line/newUserLine.connected'

const style = {
    weekDay: {minWidth: 60},
    asSmallAsPossible: {width: 1}
}

export const Body = ({users = [], sprintDays, hasError, sheet, teamName}) => {
    const {asSmallAsPossible, weekDay} = sheet.classes

    const columns = sprintDays.map((day, index) => (
        <th className={classNames(day.isWorkDay ? weekDay : asSmallAsPossible)}
            key={`headColumns-${index}`}>{day.key}</th>))

    return (
        <Container fluid style={{paddingBottom: 10}}>
            {
                users.map((username, index) => (
                    <div key={`${username}-${index}`} style={{float: 'left'}}>
                        <Popover
                            placement="top"
                            isOpen={hasError(username)}
                            target={`PopoverTarget-${username}-${index}`}
                        >
                            <Alert color="danger" style={{margin: 0}}>
                                Diese Zeit ist bereits belegt.
                            </Alert>
                        </Popover>

                        <Table size="sm" className={asSmallAsPossible} id={`PopoverTarget-${username}-${index}`}>
                            <thead>
                            <tr>
                                <th className={asSmallAsPossible}>Benutzer</th>
                                {columns}
                            </tr>
                            </thead>
                            <tbody>
                            <DataLine username={username} key={`dataLine-${index}`}/>
                            </tbody>
                        </Table>
                    </div>))
            }
            <div style={{clear: 'both'}}/>
            <NewUserLine columnsCount={columns.length + 1}/>
        </Container>)
}

const mapStateToProps = (state) => ({
    sprintDays: selectors.getSprintDays(state),
    users: selectors.getUserNames(state),
    hasError: (username) => selectors.hasInvalidEventAdd(state, username),
})
const mapActionsToProps = {
    addUser: actions.addUser,
}
export default connect(mapStateToProps, mapActionsToProps)(useSheet(style)(Body))
