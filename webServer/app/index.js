import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import store from './store';
import { getTodos} from './actions';

import './index.css';

store.dispatch(getTodos());

render(<Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));
