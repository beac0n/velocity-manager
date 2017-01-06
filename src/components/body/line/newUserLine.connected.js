import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Input, Button, Row, Col} from 'reactstrap'
import {actions} from '../../../redux/actions'

export class NewUserLine extends Component {
    constructor(props) {
        super(props)

        this.changeNewUser = this.changeNewUser.bind(this)
        this.onChangeNewUser = this.onChangeNewUser.bind(this)
        this.onAddUserClick = this.onAddUserClick.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.state = {newUserName: ''}
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.onAddUserClick()
        }
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
            <Row>
                <Col xs="12">
                    <Input
                        value={this.state.newUserName}
                        placeholder="Neuer Benutzer (Enter zum hinzufügen)"
                        onChange={this.onChangeNewUser}
                        onKeyPress={this.handleKeyPress}
                    />
                </Col>
            </Row>
        )
    }
}

const mapActionsToProps = {addUser: actions.addUser}
export default connect(null, mapActionsToProps)(NewUserLine)
