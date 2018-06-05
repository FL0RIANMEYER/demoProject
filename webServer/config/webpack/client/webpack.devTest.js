import path              from 'path';
import webpack           from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import PATHS from '../../path';


const extractCSS = new ExtractTextPlugin('[name].styles.css');

export default (env, args) => ({
    context: PATHS.root,
    entry: {
        client: ['babel-polyfill', PATHS.client],
    },
    mode: 'development',
    devtool: 'source-map',
    target: 'web', 
    cache: true,
    output: {
        path: path.join(PATHS.compiled, `${env}/public`),
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
    optimization: {
        splitChunks: {
            cacheGroups: {
              vendor: {
                chunks: 'initial',
                name: 'vendor',
                test: 'vendor',
                enforce: true,
              },
           },
        },
        runtimeChunk: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        extractCSS,
    ],
});
