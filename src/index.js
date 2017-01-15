import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import AppRouter from './components/appRouter'
import {initStore, localStateName} from './redux/init'

window.addEventListener('error', (error) => {
    const backupLocalStateName = `${localStateName}-backup`

    console.info(`got an unexpected error: ${error.message}`)
    console.info(`Saving local storage to ${backupLocalStateName}`)
    console.info('Resetting local storage')

    localStorage.setItem(backupLocalStateName, localStorage.getItem(localStateName))
    localStorage.removeItem(localStateName)

    location.reload()
})

const store = initStore()

store.subscribe(() => {
    localStorage.setItem(localStateName, JSON.stringify(store.getState()))
})

ReactDOM.render(<Provider store={store}><AppRouter/></Provider>, document.getElementById('root'))
