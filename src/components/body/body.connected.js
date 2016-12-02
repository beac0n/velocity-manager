import React from 'react'
import shortId from 'shortid'
import {connect} from 'react-redux'
import {Table, Button, Input, Container} from 'reactstrap'
import {selectors} from '../../redux/reducer'
import DayColumn from './dayColumn.connected'

const Body = ({sprintDays, getWeekDay, sprintStartIndex}) => {
    if (!getWeekDay(sprintStartIndex) || !sprintDays) {
        return null
    }


    const headerColumns = []
    for (let i = sprintStartIndex; i < (sprintStartIndex + sprintDays); i++) {
        headerColumns.push(<th style={{minWidth: 100}} key={shortId.generate()}>{getWeekDay(i % 5)}</th>)
        if ((i % 5) === 4) {
            headerColumns.push(<th style={{width: 55}} key={shortId.generate()}>Sa{' '}So</th>)
        }
    }

    const dayColumns = []
    for (let i = sprintStartIndex; i < (sprintStartIndex + sprintDays); i++) {
        dayColumns.push(<td key={shortId.generate()}><DayColumn id={i} /></td>)
        if ((i % 5) === 4) {
            dayColumns.push(<td key={shortId.generate()}/>)
        }
    }

    return (
        <Container fluid>
            <Table size="sm">
                <thead>
                <tr>
                    <th>Benutzer</th>
                    {headerColumns}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th><Input value="Max"/></th>
                    {dayColumns}
                </tr>
                <tr>
                    <td colSpan={headerColumns.length + 1}><Button block>Neuen Benutzer hinzufügen</Button></td>
                </tr>
                </tbody>
            </Table>
        </Container>)
}

const mapStateToProps = (state) => ({
    getWeekDay: (index) => selectors.getWeekDayShort(state, index),
    weekDaysShort: selectors.getWeekDaysShort(state),
    sprintDays: Math.ceil(selectors.getSprintDuration(state)),
    sprintStartIndex: selectors.getSprintStartIndex(state),
})
const mapActionsToProps = {}
export default connect(mapStateToProps, mapActionsToProps)(Body)