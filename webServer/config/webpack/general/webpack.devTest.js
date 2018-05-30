import path          from 'path';
import EmitAllPlugin from 'webpack-emit-all-plugin';

import PATHS from '../../path';


export default {
    context: PATHS.root,
    entry: {
        client: [PATHS.client],
        server: [PATHS.server],
        test:   [PATHS.test],
    },
    mode: 'development',
    devtool: 'source-map',
    target: 'node',
    cache: true,
    output: {
        path: path.join(PATHS.compiled, 'devTest'),
        filename: '[name].js',
    },
    module: {
        rules: [{
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    'presets': ['react', 'es2015', 'stage-0'],
                },
            },
            {
                test: /\.(scss)$/,
                use: [{
                        loader: 'css-loader',
                        options: {
                            alias: {
                                '../img': '../../app/images',
                            },
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                            sourceMap: true,
                            importLoaders: 1,
                            modules: true,
                            camelCase: 'dashes',
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: [/bower_components/, /node_modules/],
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        importLoaders: 1,
                        modules: true,
                        camelCase: true,
                        localIdentName: '[name]_[local]_[hash:base64:5]',
                    },
                }],
            },
            {
                test: /\.css$/,
                include: [/bower_components/, /node_modules/],
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        importLoaders: 1,
                        modules: true,
                        camelCase: true,
                        localIdentName: '[name]_[local]_[hash:base64:5]',
                    },
                }],
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './[name].[ext]',
                    },
                }],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: './[name].[ext]',
                },
            },
        ],
    },
    plugins: [
        new EmitAllPlugin({
            ignorePattern: /node_modules/,
        }),
    ],
};
