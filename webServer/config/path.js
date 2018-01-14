const path = require('path');

const CURRENT_WORKING_DIR = path.resolve(process.cwd(), 'demoProject/webServer');

module.exports = {
    root: CURRENT_WORKING_DIR,
    server:   path.resolve(CURRENT_WORKING_DIR, 'server'),
    client:   path.resolve(CURRENT_WORKING_DIR, 'app'),
    compiled: path.resolve(CURRENT_WORKING_DIR, 'compiled'),
    modules:  path.resolve(CURRENT_WORKING_DIR, 'node_modules'),
};
