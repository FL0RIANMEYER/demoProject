const webdriver = require('selenium-webdriver');
import chai      from 'chai';
import sinon     from 'sinon';
import sinonChai from 'sinon-chai';

import pages from './pages';


chai.use(sinonChai);

const should = chai.should();

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

let page;

describe('cacheHandler', () => {
    beforeEach(() => {
        page = pages.index(driver);
        page.navigate();
    });
    describe('clean cache', () => {
        it('returns exchange date with API request', function* () {
            page.toggleSignup();
            page.enterMail('test@test.com');
            yield page.signup();
        });
    });
});
