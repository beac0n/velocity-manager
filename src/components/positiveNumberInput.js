import React, {Component} from 'react'
import {Input} from 'reactstrap'

class PositiveNumberInput extends Component {
    constructor(props) {
        super(props)

        this.saveValue = this.saveValue.bind(this)
        this.state = {}
    }

    saveValue(value) {
        this.setState({value})
    }

    render() {
        const {onChange, maxValue, minValue, value, ...otherProps} = this.props

        const numberMaxValue = Number(maxValue)
        const numberMinValue = Number(minValue)

        const _onChange = ({target}) => {
            let numberValue = Number(target.value)

            if (numberValue > numberMaxValue) {
                numberValue = numberMaxValue
            } else if (numberValue < numberMinValue) {
                numberValue = numberMinValue
            }

            if (numberValue !== this.state.value) {
                this.saveValue(numberValue)
                onChange(numberValue)
            }
        }

        return (<Input {...otherProps} onChange={_onChange} type="number" value={value || this.state.value}/>)
    }
}


export default PositiveNumberInput