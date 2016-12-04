import React from 'react'
import shortId from 'shortid'
import {connect} from 'react-redux'
import useSheet from 'react-jss'
import {Table, Button, Input, Container} from 'reactstrap'
import {selectors} from '../../redux/reducer'
import DayColumn from './dayColumn.connected'

const columnWidth = 110
const style = {
    headColumnWeekDay: {minWidth: columnWidth},
    headColumnWeekEnd: {minWidth: columnWidth/2},
}

const Body = ({sprintDayKeys, weekDayKeys, sheet}) => {
    const {headColumnWeekDay, headColumnWeekEnd} = sheet.classes

    const headerColumns = sprintDayKeys.map((day) => {
        const headColumnClass = weekDayKeys.includes(day) ? headColumnWeekDay : headColumnWeekEnd
        return <th className={headColumnClass} key={shortId.generate()}>{day}</th>
    })

    const dayColumns = sprintDayKeys.map((day, index) => (
        <td key={shortId.generate()}>
            <DayColumn isPlaceholder={!weekDayKeys.includes(day)} id={index}/>
        </td>))

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
    weekDayKeys: selectors.getWorkDayKeys(state),
    sprintDayKeys: selectors.getSprintDayKeys(state)
})
const mapActionsToProps = {}
export default connect(mapStateToProps, mapActionsToProps)(useSheet(style)(Body))