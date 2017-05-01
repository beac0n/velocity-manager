import React from 'react'
import {Provider} from 'react-redux'
import AppRouter from './components/appRouter'

const ProviderApp = ({store}) => <Provider store={store}><AppRouter/></Provider>

export default ProviderApp