import * as webdriver from 'webdriverio';
import Page from './page';

const remote = webdriver.remote({
    host: '192.168.178.20',
    port: 4444,
    desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
            // args: ['--headless'],
        },
    },
});
before(async function() {
    this.timeout(50000);
    return await remote.init();
});
after(async function() {
    this.timeout(50000);
    return await remote.end();
});
describe('TodoMVC - ', () => {
    describe('Clear completed button', function() {
        it('should display the correct text', async function() {
            let title = await remote.url('http://localhost:3000/').getTitle();
            console.log('asd:', title);
        }).timeout(50000);

        it('should display the correct text', async function() {
            let title = await remote.url('http://localhost:3000/').getTitle();
            console.log('asd:', title);
        }).timeout(50000);
        it('should display the correct text', async function() {
            let title = await remote.url('http://localhost:3000/').getTitle();
            console.log('asd:', title);
        }).timeout(50000);
        it('should display the correct text', async function() {
            let title = await remote.url('http://localhost:3000/').getTitle();
            console.log('asd:', title);
        }).timeout(50000);
        it('should display the correct text', async function() {
            let title = await remote.url('http://localhost:3000/').getTitle();
            console.log('asd:', title);
        }).timeout(50000);
    });
});
