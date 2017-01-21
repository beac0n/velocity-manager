import React from 'react'
import {shouldRender} from '../../test/utils'

import AppRouter from './appRouter'
import App from './app'

describe('<AppRouter />', shouldRender(AppRouter))
describe('<App />', shouldRender(App))
