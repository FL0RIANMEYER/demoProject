import general from './webpack.general.babel.js';
import client  from './webpack.client.babel.js';
import server  from './webpack.server.babel.js';

export default (env, args) => {
    const config = [
        client( env, args),
        server( env, args),
        general(env, args),
    ];

    return config.filter(c => !!c);
};  
