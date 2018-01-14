const path = require('path');

const nodeExternals              = require('webpack-node-externals');
const webpackSourceMapSupport    = require('webpack-source-map-support');

const webpack = require('webpack');

const PATH = require('./path');

module.exports = {
    context: PATH.root,
    entry: [
        'babel-polyfill',
        path.join(PATH.server, 'index.js'),
    ],
    target:  'node',
    devtool: 'source-map',
    cache:    true,
    output: {
        path:          path.join(PATH.compiled, 'server'),
        filename:      '[name].dev.js',
        libraryTarget: 'commonjs2',
    },
    node: {
        __dirname:  true,
        __filename: true,
    },
    externals: [
        nodeExternals({ whitelist: [/\.(?!js$).*$/i] })
    ],
    module: {
        loaders: [{
                test:    /\.js$/,
                loader:  'babel-loader',
                exclude: PATH.modules,

                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                },
            },
        ],
    },
    plugins: [
        new webpackSourceMapSupport(),
    ],
};
