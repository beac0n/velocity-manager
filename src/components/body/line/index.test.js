import React from 'react'
import {shouldRender} from '../../../../test/utils'

import {DataLine} from './dataLine.connected'
import {NewUserLine} from './newUserLine.connected'

describe('<DataLine />', shouldRender(DataLine))
describe('<NewUserLine />', shouldRender(NewUserLine))
