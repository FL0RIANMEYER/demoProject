import React from 'react';
import { hydrate } from 'react-dom';

import App from './components/app';

import './index.css';


hydrate(<App/>, document.getElementById('root'));
