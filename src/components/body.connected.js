import React from 'react'
import shortId from 'shortid'
import {connect} from 'react-redux'
import {Table, Button, Input} from 'reactstrap'
import {selectors} from '../redux/reducer'

const Body = ({sprintDays, weekDays, sprintStart}) => {
    if(!sprintStart || !sprintDays) {
        return null
    }

    const sprintStartIndex = weekDays.indexOf(sprintStart)

    const headerColumns = []
    for (let i = sprintStartIndex; i < (sprintStartIndex + sprintDays); i++) {
        headerColumns.push(<th style={{width: 1}} key={shortId.generate()}>{weekDays[i % 5]}</th>)
        if((i % 5) === 4) {
            headerColumns.push(<th style={{width: 1}} key={shortId.generate()}>Samstag</th>)
            headerColumns.push(<th style={{width: 1}} key={shortId.generate()}>Sonntag</th>)
        }
    }

    const dayColumns = []
    for (let i = sprintStartIndex; i < (sprintStartIndex + sprintDays); i++) {
        dayColumns.push(<td style={{width: 1}} key={shortId.generate()}><Button style={{width: 45}} block>X</Button></td>)
        if((i % 5) === 4) {
            dayColumns.push(<td style={{width: 1}} key={shortId.generate()} />)
            dayColumns.push(<td style={{width: 1}} key={shortId.generate()} />)
        }
    }

    return (
        <Table hover size="sm">
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
        </Table>)
}

const mapStateToProps = (state) => ({
    weekDays: selectors.getWeekDays(state),
    sprintDays: Math.ceil(selectors.getSprintDuration(state)),
    sprintStart: selectors.getSprintStart(state, 'sprintStart'),
})
const mapActionsToProps = {}
export default connect(mapStateToProps, mapActionsToProps)(Body)