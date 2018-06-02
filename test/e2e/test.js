import * as webdriver from 'webdriverio';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiWebdriver  from 'chai-webdriverio';

import Page from './page';


chai.should();

const browser = webdriver.remote({
    host: '192.168.178.20',
    port: 4444,
    desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
            // args: ['--headless'],
        },
    },
});
const page = new Page(browser, webdriver);

chai.use(chaiAsPromised);
chai.use(chaiWebdriver(browser));
chaiAsPromised.transferPromiseness = browser.transferPromiseness;

async function clearItems() {
    try {
        const hasFooter = await browser.isExisting('.footer');
        if(!hasFooter) { return; }

        await browser.waitForExist('.todo-count > strong', 10000);
        const el = await browser.getText('.todo-count > strong');

        if(el != 'No') {
            await browser.click('.main label');
        }

        await browser.click('.clear-completed');
        await browser.waitUntil(async() => {
            return (await browser.isExisting('.footer')) == false;
        }, 2000);
    } catch (e) {console.log(e );}
}

describe('TodoMVC - ', function() {
    before(function() {
        this.timeout(5000);
        return browser.init();
    });
    after(async function() {
        this.timeout(5000);
        browser.end();
    });
    beforeEach(function() {
        this.timeout(5000);
        browser.url('http://localhost:3000/');
    });

    describe('When page is initially opened', function() {
        it('should focus on the todo input field', async function() {
            await browser
                .hasFocus(page.css.NEW_INPUT).should.eventually.be.true;
        });
    });

    describe('No Todos', function() {
        beforeEach(async function() {
            this.timeout(5000);
            await clearItems();
        });
        it('should hide #main and #footer', async function() {
            this.timeout(10000);
            await clearItems();

            await browser.waitUntil(async() => {
                return (await browser.isExisting('.footer')) == false;
            }, 2000);
        });
        it('should allow me to add todo item', async function() {
            this.timeout(10000);
            await clearItems();


            await browser.setValue('.new-todo', 'Item One\n');

            await browser.waitForExist('.todo-count', 10000);
            await browser.waitUntil(async() => {
                return (await browser.getText('.todo-count > strong')) == '1';
            }, 2000);


            const todos = await browser.elements('.todo-list > li');
            const todo = await browser.getText('.view > label');

            todos.value.length.should.be.equal(1);
            todo.should.be.equal('Item One');
        });

        it('should clear text input field when an item is added', async function() {
            this.timeout(50000);
            await clearItems();


            await browser.setValue('.new-todo', 'Item One\n');

            await browser.waitForExist('.todo-count', 10000);
            await browser.waitUntil(async() => {
                // const t = await browser.getText('.todo-count > strong');
                // console.log('t:', t);
                return (await browser.getText('.todo-list > li:last-child .view > label')) == 'Item One';
            }, 30000);


            const todo = await browser.getText('.new-todo');

            todo.should.be.equal('');
        });

        it('should append new items to the bottom of the list', async function() {
            this.timeout(20000);
            await clearItems();


            await browser.setValue('.new-todo', 'Item One\n');
            await browser.setValue('.new-todo', 'Item Two\n');

            await browser.waitForExist('.todo-count', 10000);
            await browser.waitUntil(async() => {
                return (await browser.getText('.todo-list > li:last-child .view > label')) == 'Item Two';
            }, 10000);


            const todo = await browser.getText('.todo-list > li:last-child .view > label');

            todo.should.be.equal('Item Two');
        });
    });

    describe('Clear completed button', function() {
        it('should display the correct text', async function() {
            await clearItems();
            let title = await browser.url('http://localhost:3000/').getTitle();
        }).timeout(5000);
    });
});
