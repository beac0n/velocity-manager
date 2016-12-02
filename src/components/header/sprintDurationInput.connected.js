import {connect} from 'react-redux'
import {actions} from '../../redux/actions'
import {selectors} from '../../redux/reducer'
import PositiveNumberInput from '../positiveNumberInput'

const mapStateToProps = (state) => ({
    value: selectors.getSprintDuration(state)
})
const mapActionsToProps = {
    onChange: actions.changeSprintDuration,
}

export default connect(mapStateToProps, mapActionsToProps)(PositiveNumberInput)