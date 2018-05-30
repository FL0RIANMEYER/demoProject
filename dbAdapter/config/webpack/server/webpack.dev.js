import PATHS from '../../path';

export default {
    context: PATHS.root,
    entry: {
        server: ['babel-polyfill', PATHS.server],
    },
    target: 'node',
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: PATHS.compiled,
        filename: '[name].dev.js',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,

                query: {
                    'presets': ['es2015', 'stage-0'],
                },
            },
        ],
    },
};
