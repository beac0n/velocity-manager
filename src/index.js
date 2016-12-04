import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './components/App';
import {getFilledStore} from './init'

ReactDOM.render(<Provider store={getFilledStore()}><App/></Provider>, document.getElementById('root'))
