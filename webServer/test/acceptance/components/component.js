import webdriver from 'selenium-webdriver';

import { url } from '../../../config/env';


export default driver => {
    const By    = webdriver.By;
    const until = webdriver.until;
    const elements = {
        todos:                By.id('todos'),
        form:                 By.id('form'),
        fromInput:            elements.form.tagName('input'),
        fromButton:           elements.form.tagName('button'),
    };

    return {

        elements: elements,
        submit: () => driver.wait(until.elementLocated(elements.toggleSignupButton)),
        navigate: function() {
            driver.navigate().to(this.url);
            return this.waitUntilVisible();
        },
        enterMail: value => driver.findElement(elements.mailInput).sendKeys(value),
        toggleSignup: () => driver.findElement(elements.toggleSignupButton).click(),
        signup: () => driver.findElement(elements.signupButton).click(),
    };
};
