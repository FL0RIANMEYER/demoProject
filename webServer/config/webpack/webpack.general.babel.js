import nodeExternals           from 'webpack-node-externals';
import RtpReporterPlugin          from 'webpack-rtp-reporter';

import devTest from './general/webpack.devTest';


export default (env, args) => {
    const node = {
        __dirname: true,
        __filename: true,
    };

    const config = devTest;

    config.node    = node;
    config.plugins = config.plugins || [];
    config.resolve = { extensions: ['.js', '.jsx'] };
    config.externals = [nodeExternals()];

    config.plugins.push(new RtpReporterPlugin({
        stageName: `${env}.build`,
    }));

    return config;
};
