import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers';
import middleware  from './middleware';

const defaultState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    rootReducer,
    defaultState,
    composeEnhancers(applyMiddleware(...middleware)),
);
