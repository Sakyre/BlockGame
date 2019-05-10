import React from 'react'
//import { render } from 'react-dom'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
//import * as serviceWorker from './serviceWorker';
import projectStore from './store'

const store = projectStore()

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
)

//serviceWorker.unregister();
