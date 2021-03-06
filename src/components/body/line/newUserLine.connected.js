import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Input, InputGroup, InputGroupButton, Button, Row, Col} from 'reactstrap'
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
                <Col sm="12">
                    <InputGroup>
                        <InputGroupButton>
                            <Button onClick={this.onAddUserClick}>+</Button>
                        </InputGroupButton>
                        <Input
                            value={this.state.newUserName}
                            onKeyPress={this.handleKeyPress}
                            onChange={this.onChangeNewUser}
                            placeholder="Neuer Benutzer"
                        />
                    </InputGroup>
                </Col>
            </Row>)
    }
}

NewUserLine.propTypes = {
    addUser: React.PropTypes.func,
}

const mapActionsToProps = (dispatch, ownProps) => ({
    addUser: (username) => dispatch(actions.addUser(username, ownProps.teamName))
})

export default connect(null, mapActionsToProps)(NewUserLine)
