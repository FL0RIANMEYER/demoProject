import ExtractTextPlugin          from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin          from 'html-webpack-plugin';
import nodeExternals      from 'webpack-node-externals';
import RtpReporterPlugin  from 'webpack-rtp-reporter';
import WebpackShellPlugin from 'webpack-shell-plugin';
import devTest from './general/webpack.devTest';

import PATHS from '../path';


export default (env, args) => {
    const node = {
        __dirname: false,
        __filename: false,
    };

    const configs = { devTest: devTest(env, args), test: devTest(env, args) };
    const config = configs[env];

    if(!config) { return; }

    config.node    = node;
    config.plugins = config.plugins || [];
    config.resolve = { extensions: ['.js', '.jsx'] };
    config.externals = [nodeExternals()];

    config.plugins.push(new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true,
    }));
    config.plugins.push(new HtmlWebpackPlugin({
        inject: true,
        template: PATHS.client + '/index.html',
        filename: 'index.html',
    }));

    config.plugins.push(new RtpReporterPlugin({
        stageName: `${env}.build.general`,
    }));

    if(env == 'devTest') {
        config.plugins.push(new WebpackShellPlugin({
            safe: true,
            onBuildExit: [
                'npm run test:devTest:service >nul 2>&1',
                'npm run test:devTest:system >nul 2>&1',
                // 'cd.. && npm run git-commit',
            ],
        }));
    }


    return config;
};
