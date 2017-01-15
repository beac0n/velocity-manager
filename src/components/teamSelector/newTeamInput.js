import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Input, InputGroup, InputGroupButton, Button} from 'reactstrap'
import {actions} from '../../redux/actions'

export class NewTeamInput extends PureComponent {
    constructor(props) {
        super(props)

        this.addTeamAndClear = this.addTeamAndClear.bind(this)
        this.state = {newTeamName: ''}
    }

    addTeamAndClear() {
        const {addTeam} = this.props
        addTeam(this.state.newTeamName)
        this.setState({newTeamName: ''})
    }

    render() {
        return (
            <InputGroup size="lg">
                <InputGroupButton>
                    <Button onClick={this.addTeamAndClear}>+</Button>
                </InputGroupButton>
                <Input
                    value={this.state.newTeamName}
                    onKeyPress={(event) => event.key === 'Enter' && this.addTeamAndClear()}
                    onChange={(event) => this.setState({newTeamName: event.target.value})}
                    placeholder="Bitte geben Sie einen Teamnamen ein"
                />
            </InputGroup>)
    }
}

const mapStateToProps = (state) => ({
})
const mapActionsToProps = {
    addTeam: actions.addTeam
}

export default connect(mapStateToProps, mapActionsToProps)(NewTeamInput)