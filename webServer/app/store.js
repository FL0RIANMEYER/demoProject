import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers';
import middleware  from './middleware';

const defaultState     = typeof window !== 'undefined' ? window.storeState : {};
const composeEnhancers = typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

export default createStore(
    rootReducer,
    defaultState,
    composeEnhancers(applyMiddleware(...middleware)),
);
