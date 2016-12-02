import React from 'react'
import shortId from 'shortid'
import {connect} from 'react-redux'
import useSheet from 'react-jss'
import {Table, Button, Input, Container} from 'reactstrap'
import {selectors} from '../../redux/reducer'
import DayColumn from './dayColumn.connected'

const style = {
    headColumnWeekDay: {
        minWidth: 100,
    },
    headColumnWeekEnd: {
        minWidth: 55,
    },
}

const Body = ({sprintDaysShort, weekDaysShort, sheet}) => {
    if (!sprintDaysShort) {
        return null
    }

    const {headColumnWeekDay, headColumnWeekEnd} = sheet.classes

    const headerColumns = sprintDaysShort.map((day) => {
        const headColumnClass = weekDaysShort.includes(day) ? headColumnWeekDay : headColumnWeekEnd
        return <th className={headColumnClass} key={shortId.generate()}>{day}</th>
    })

    const dayColumns = sprintDaysShort.map((day, index) => {
        return (
            <td key={shortId.generate()}>
                <DayColumn isPlaceholder={!weekDaysShort.includes(day)} id={index}/>
            </td>)
    })

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
                    <td><Input placeholder="Benutzername"/></td>
                    <td colSpan={headerColumns.length}><Button block>Neuen Benutzer hinzufügen</Button></td>
                </tr>
                </tbody>
            </Table>
        </Container>)
}

const mapStateToProps = (state) => ({
    weekDaysShort: selectors.getWeekDaysShort(state),
    sprintDaysShort: selectors.getSprintDaysShort(state)
})
const mapActionsToProps = {}
export default connect(mapStateToProps, mapActionsToProps)(useSheet(style)(Body))