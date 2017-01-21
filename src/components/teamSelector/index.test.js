import React from 'react'
import {shallow} from 'enzyme'

import {NewTeamInput} from './newTeamInput.connected'
import {TeamSelector} from './teamSelector.connected'

describe('teamSelector <NewTeamInput />', () => {
    it('should render', () => {
        shallow(<NewTeamInput />);
    })
})

describe('teamSelector <TeamSelector />', () => {
    it('should render', () => {
        shallow(<TeamSelector />);
    })
})
