import nodeExternals           from 'webpack-node-externals';
import webpackSourceMapSupport from 'webpack-source-map-support';
import RtpReporterPlugin          from 'webpack-rtp-reporter';

import dev     from './server/webpack.dev';
import devTest from './server/webpack.devTest';
import test    from './server/webpack.test';
import prod    from './server/webpack.prod';


export default (env, args) => {
    const node = {
        __dirname: false,
        __filename: false,
    };

    const configs = { dev, devTest, test, prod };
    const config = configs[env];

    if(!config) { return; }

    config.plugins   = config.plugins || [];
    config.node      = node;
    config.resolve   = { extensions: ['.js', '.jsx'] };
    config.externals = [nodeExternals()];

    config.plugins.push(new webpackSourceMapSupport());

    config.plugins.push(new RtpReporterPlugin({
        stageName: `${env}.build.server`,
    }));

    return config;
};
