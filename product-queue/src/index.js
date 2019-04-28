import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import ProjectLogin from './components/LoginForm/projectLogin.js';
//import './index.css';
import App from './App';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

ReactDOM.render(
    <Provider store={store}>
        <App />
        <ProjectLogin />
    </Provider>, document.getElementById('root'));
