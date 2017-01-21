import React from 'react'
import {shouldRender} from '../../../../../test/util'

import {Event} from './event.connected'
import {Column} from './index'
import {TimeLine} from './timeLine.connected'
import TimeLines from './timeLines'

describe('<Event />', shouldRender(Event))
describe('<Column />', shouldRender(Column))
describe('<TimeLine />', shouldRender(TimeLine))
describe('<TimeLines />', shouldRender(TimeLines))
