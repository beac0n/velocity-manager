import React from 'react'
import {shouldRender} from '../../../test/util'

import {Header} from './index'
import {InputWrapper} from './sprintDurationInput.connected'
import {SprintStartDropDown} from './sprintStartDropDown.connected'

describe('<Header />', shouldRender(Header))
describe('<InputWrapper />', shouldRender(InputWrapper))
describe('<SprintStartDropDown />', shouldRender(SprintStartDropDown))