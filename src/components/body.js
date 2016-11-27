import React from 'react'
import {Table} from 'reactstrap'

const Body = () => (
    <Table>
        <thead>
        <tr>
            <th>Benutzer</th>
            <th>Montag</th>
            <th>Dienstag</th>
            <th>Mittwoch</th>
            <th>Donnerstag</th>
            <th>Freitag</th>
            <th>Samstag</th>
            <th>Sonntag</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>Max</td>
            <td>FULL</td>
            <td>X</td>
            <td>/</td>
            <td>FULL</td>
            <td>FULL</td>
            <td>X</td>
            <td>X</td>
        </tr>
        </tbody>
    </Table>)

export default Body