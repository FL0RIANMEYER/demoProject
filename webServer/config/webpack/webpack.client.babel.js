import ExtractTextPlugin          from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin          from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import RtpReporterPlugin          from 'webpack-rtp-reporter';

import PATHS from '../path';
import dev     from './client/webpack.dev';


export default (env, args) => {
    const node = {
        __dirname: true,
        __filename: true,
    };

    const configs = { dev, devTest: dev };
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
    config.plugins.push(new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
    }));

    config.plugins.push(new RtpReporterPlugin({
        stageName: `${env}.client`,
    }));

    return config;
};
