import React from 'react'
import {shouldRender} from '../../test/util'

import AppRouter from './appRouter'
import App from './app'

describe('<AppRouter />', shouldRender(AppRouter))
describe('<App />', shouldRender(App))
