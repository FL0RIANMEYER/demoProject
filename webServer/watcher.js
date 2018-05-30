let chokidar = require('chokidar');
let spawn = require('child_process').spawn;
let path = process.argv[2] || '.';


let lastfile = null;
let currentProcess;


if(!~path.indexOf('compiled')) { path += '/compiled/server.dev.js'; }

currentProcess = spawn('node', ['--trace-warnings', path], { stdio: 'inherit'});
// currentProcess = spawn('node', ['--inspect', '--trace-warnings', path], { stdio: 'inherit'});

chokidar.watch([
    './' + path,
], { ignoreInitial: true }).on('all', (event, filepath) => {
    if(lastfile == filepath) { return; }
    lastfile = filepath;
    setTimeout(function() { lastfile = null; }, 600);


    if(currentProcess) { currentProcess.kill(); }

    setTimeout(() => {
        console.log('---------------- Start ----------------');
        currentProcess = spawn('node', ['--trace-warnings', path], { stdio: 'inherit'});
        // currentProcess = spawn('node', ['--inspect', '--trace-warnings', path], { stdio: 'inherit'});
        currentProcess.on('error', (err) => {
            console.log('Failed to start child process.');
        });
    }, process.argv[3] || 0);
});
