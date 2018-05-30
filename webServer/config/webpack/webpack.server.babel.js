import nodeExternals           from 'webpack-node-externals';
import webpackSourceMapSupport from 'webpack-source-map-support';

import dev     from './server/webpack.dev';


export default (env, args) => {
    const node = {
        __dirname: true,
        __filename: true,
    };

    const configs = { dev, devTest: dev };
    const config = configs[env];

    if(!config) { return; }

    config.plugins   = config.plugins || [];
    config.node      = node;
    config.resolve   = { extensions: ['.js', '.jsx'] };
    config.externals = [nodeExternals()];

    config.plugins.push(new webpackSourceMapSupport());

    return config;
};
