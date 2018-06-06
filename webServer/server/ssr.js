import fs from 'fs';
import path    from 'path';
import express from 'express';
import React from 'react';
import purify from 'purify-css';
import { renderToNodeStream } from 'react-dom/server';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Mustache from 'Mustache';
import rootReducer from '../app/reducers';
import db from './db';

import App from '../app/components/app';

const html   = fs.readFileSync(path.join(__dirname, 'public', 'index.html')) + '';
const styles = fs.readFileSync(path.join(__dirname, 'public', 'client.styles.css')) + '';
const router = express.Router();

global.window = {};


router.get('*', async(req, res) => {
    const todos = await db.getAll();
    const store = createStore(rootReducer, { todos });


    const appContent = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );

    const criticalStyles = purify(appContent, styles, {
        minify: true,
    });

    const response = Mustache.render(html, {
        html: appContent,
        state: JSON.stringify(store.getState()),
        style: criticalStyles,
    });
    // const appScript = `
    //     <div id="root">${appContent}</div>
    //     <script>window.storeState=${JSON.stringify(store.getState())}</script>
    // `;

    // const response = html
    //     .replace('<div id="root"></div>', appScript)
    //     .replace('<div id=root></div>', appScript);

    res.write(response);
    res.end();
});

export default router;
