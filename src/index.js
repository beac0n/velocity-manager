import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import AppRouter from './components/appRouter';
import {initStore, localStateName} from './redux/init'

const store = initStore()

store.subscribe(() => {
    localStorage.setItem(localStateName, JSON.stringify(store.getState()))
})

ReactDOM.render(<Provider store={store}><AppRouter/></Provider>, document.getElementById('root'))
