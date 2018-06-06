import path              from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import PATHS from '../../path';


const extractCSS = new ExtractTextPlugin('[name].styles.css');


export default {
    context: PATHS.root,
    entry: {
        server: ['babel-polyfill', PATHS.server],
    },
    target: 'node',
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: path.join(PATHS.compiled, 'dev'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [{
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,

                query: {
                    'presets': ['react', 'es2015', 'stage-0'],
                },
            },
            {
                test: /\.(scss)$/,
                use: ['css-hot-loader'].concat(extractCSS.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                alias: {
                                    '../img': '../../app/images',
                                },
                                localIdentName: '[local]',
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
                })),
            },
            {
                test: /\.css$/,
                exclude: [/bower_components/, /node_modules/],
                use: ['css-hot-loader'].concat(extractCSS.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: true,
                            camelCase: true,
                            localIdentName: '[local]',
                        },
                    }],
                })),
            },
            {
                test: /\.css$/,
                include: [/bower_components/, /node_modules/],
                use: extractCSS.extract({
                  fallback: 'style-loader',
                  use: [{
                      loader: 'css-loader',
                      options: {
                          sourceMap: true,
                          importLoaders: 1,
                          modules: true,
                          camelCase: true,
                          localIdentName: '[local]',
                      },
                  }],
                }),
            },
        ],
    },
    plugins: [
        extractCSS,
    ],
};
