import ExtractTextPlugin          from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin          from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import RtpReporterPlugin          from 'webpack-rtp-reporter';
import PreloadWebpackPlugin       from 'preload-webpack-plugin';
import OptimizeCssAssetsPlugin    from 'optimize-css-assets-webpack-plugin';


import PATHS from '../path';
import dev     from './client/webpack.dev';
import devTest from './client/webpack.devTest';
import test    from './client/webpack.test';
import prod    from './client/webpack.prod';

export default (env, args) => {
    const node = {
        __dirname: false,
        __filename: false,
    };

    const configs = { dev: dev(env, args), devTest: devTest(env, args), test: test(env, args), prod: prod(env, args) };
    const config = configs[env];

    if(!config) { return; }

    config.node    = node;
    config.plugins = config.plugins || [];
    config.resolve = { extensions: ['.js', '.jsx'] };

    config.plugins.push(new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true,
    }));
    config.plugins.push(new HtmlWebpackPlugin({
        inject: true,
        template: PATHS.client + '/index.html',
        filename: 'index.html',
    }));


    // config.plugins.push(new PreloadWebpackPlugin({
    //     rel: 'preload',
    //     include: 'allChunks',
    //     // fileBlacklist: [/\.js/, /\.map/],
    // }));
    config.plugins.push(new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
    }));


    config.plugins.push(new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
    }));

    config.plugins.push(new RtpReporterPlugin({
        stageName: `${env}.build.client`,
    }));

    return config;
};
