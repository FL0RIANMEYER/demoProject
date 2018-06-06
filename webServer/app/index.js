import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import store from './store';
import { getTodos } from './actions';

import './index.css';

store.dispatch(getTodos());

hydrate(<Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));
