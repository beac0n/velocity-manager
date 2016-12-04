import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './components/App';
import {fillStore} from './init'

ReactDOM.render(<Provider store={fillStore()}><App/></Provider>, document.getElementById('root'))