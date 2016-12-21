import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import AppRouter from './components/appRouter';
import {initStore} from './redux/init'

ReactDOM.render(<Provider store={initStore()}><AppRouter/></Provider>, document.getElementById('root'))
