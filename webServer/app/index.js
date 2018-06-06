import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import store from './store';

import './index.css';


hydrate(<Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));
