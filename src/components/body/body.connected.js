import React from 'react'
import shortId from 'shortid'
import {connect} from 'react-redux'
import useSheet from 'react-jss'
import {Table, Button, Input, Container} from 'reactstrap'
import {selectors} from '../../redux/reducer'
import DayColumn from './dayColumn.connected'

const columnWidth = 110
const style = {
    weekDay: {minWidth: columnWidth},
    weekEnd: {minWidth: columnWidth / 2},
}

const Body = ({sprintDays, sheet}) => {
    const {weekDay, weekEnd} = sheet.classes

    const columns = sprintDays.map((day) => <th className={day.isWorkDay ? weekDay : weekEnd} key={shortId.generate()}>{day.key}</th>)

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
                <tr>
                    <th><Input value="Max"/></th>
                    {sprintDays.map((day, index) => (
                        <td key={shortId.generate()}><DayColumn isPlaceholder={!day.isWorkDay} id={index}/></td>
                    ))}
                </tr>
                <tr>
                    <td><Input placeholder="Benutzername"/></td>
                    <td colSpan={columns.length}><Button block>Neuen Benutzer hinzufügen</Button></td>
                </tr>
                </tbody>
            </Table>
        </Container>)
}

const mapStateToProps = (state) => ({
    sprintDays: selectors.getSprintDays(state),
})
const mapActionsToProps = {}
export default connect(mapStateToProps, mapActionsToProps)(useSheet(style)(Body))