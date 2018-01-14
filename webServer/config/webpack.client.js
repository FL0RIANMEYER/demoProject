const path                       = require('path');
const webpack                    = require('webpack');
const nodeExternals              = require('webpack-node-externals');
const ExtractTextPlugin          = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin          = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const PATH = require('./path');

const extractCSS = new ExtractTextPlugin({ filename: '[name].css', allChunks: true });


module.exports = {
    entry: [
        'react-hot-loader/patch',
        'babel-polyfill',
        path.join(PATH.client, '/app.jsx'),
    ],
    target:  'web',
    devtool: 'cheap-module-source-map',
    cache:   true,
    output: {
        path: path.join(PATH.compiled, 'client'),
        filename: '[name].js',
    },
    node: {
        __dirname: true,
        __filename: true,
    },
    module: {
        loaders: [{
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
                use: ['css-hot-loader'].concat(extractCSS.extract({
                    fallback: 'style-loader',
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
                })),
            },
            {
                test: /\.css$/,
                exclude: [/bower_components/, /node_modules/],
                use: extractCSS.extract({
                    fallback: 'style-loader',
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
                }),
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
                          localIdentName: '[name]_[local]_[hash:base64:5]',
                      },
                  }],
                }),
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './img/[name].[hash].[ext]',
                    },
                }],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[hash].[ext]',
                },
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: ({ resource }) => {
                return resource && resource.match(/\.js$/) && resource.indexOf('node_modules') >= 0;
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
        }),

        extractCSS,
        new HtmlWebpackPlugin({
            inject: true,
            template: PATH.client + '/index.html',
            filename: 'index.html',
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer',
        }),
    ],
};
