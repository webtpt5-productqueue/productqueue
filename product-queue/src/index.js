import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import App from './App';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
// import reducer from './reducers';

ReactDOM.render(
    <Provider store={store}>
        <App />
        <ProjectLogin />
    </Provider>, document.getElementById('root'));
