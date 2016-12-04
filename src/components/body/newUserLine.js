import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Input, Button} from 'reactstrap'
import {actions} from '../../redux/actions'

class NewUserLine extends Component {
    constructor(props) {
        super(props)

        this.changeNewUser = this.changeNewUser.bind(this)
        this.onChangeNewUser = this.onChangeNewUser.bind(this)
        this.onAddUserClick = this.onAddUserClick.bind(this)
        this.state = {newUserName: ''}
    }

    changeNewUser(newUserName = '') {
        this.setState({newUserName})
    }

    onChangeNewUser(event) {
        this.changeNewUser(event.target.value)
    }

    onAddUserClick() {
        const {addUser} = this.props

        this.changeNewUser()
        addUser(this.state.newUserName)
    }

    render() {
        return (
            <tr>
                <td>
                    <Button block onClick={this.onAddUserClick}>Neuen Benutzer hinzufügen</Button>
                </td>
                <td colSpan={this.props.columnsCount - 1}>
                    <Input value={this.state.newUserName} placeholder="Benutzername" onChange={this.onChangeNewUser}/>
                </td>

            </tr>)
    }
}

const mapActionsToProps = {
    addUser: actions.addUser,
}

export default connect(null, mapActionsToProps)(NewUserLine)
