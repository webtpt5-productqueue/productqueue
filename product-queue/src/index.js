import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import App from './App';

<<<<<<< HEAD
import './index.css';

const store = createStore(reducer, applyMiddleware(thunk));
=======
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
// import reducer from './reducers';
>>>>>>> afbc09a8b775efb337bd3f7c790101a018aa1db1

ReactDOM.render(
    <Provider store={store}>
        <App />
<<<<<<< HEAD
=======
        <ProjectLogin />
>>>>>>> afbc09a8b775efb337bd3f7c790101a018aa1db1
    </Provider>, document.getElementById('root'));
