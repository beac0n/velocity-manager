import React from 'react';
import {Input} from 'reactstrap';

const PositiveNumberInput = ({onChange, value, maxValue, minValue, ...otherProps}) => {
    const numberMaxValue = Number(maxValue)
    const numberMinValue = Number(minValue)

    const _onChange = ({target}) => {
        let numberValue = Number(target.value)

        if (numberValue > numberMaxValue) {
            numberValue = numberMaxValue
        } else if (numberValue < numberMinValue) {
            numberValue = numberMinValue
        }

        onChange(numberValue)
    }

    return (<Input {...otherProps} onChange={_onChange} type="number" value={value} />)
}

export default PositiveNumberInput