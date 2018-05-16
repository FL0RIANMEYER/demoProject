import { public as publicPath } from './path';

import dotenv  from 'dotenv';
import convict from 'convict';

dotenv.config();
const config = convict({
    env: {
        format: ['dev', 'devtest', 'test', 'prod'],
        default: 'prod',
        arg: 'nodeEnv',
        env: 'NODE_ENV',
    },
    port: {
        format: String,
        default: 3000,
        arg: 'port',
        env: 'PORT',
    },
});

config.validate({ allowed: 'strict' });

const { port } = config.getProperties();


export         { port, publicPath };
export default { port, publicPath };
