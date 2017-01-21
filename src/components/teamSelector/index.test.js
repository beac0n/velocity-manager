import React from 'react'
import {shouldRender} from '../../../test/utils'

import {NewTeamInput} from './newTeamInput.connected'
import {TeamSelector} from './teamSelector.connected'

describe('<NewTeamInput />', shouldRender(NewTeamInput))
describe('<TeamSelector />', shouldRender(TeamSelector))