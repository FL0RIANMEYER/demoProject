import general from './webpack.general.babel.js';
import client  from './webpack.client.babel.js';
import server  from './webpack.server.babel.js';

export default (env, args) => {
    const config = [
        general(env, args),
        client( env, args),
        server( env, args),
    ];

    return config.filter(c => !!c);
};
 
