'use strict';

// let webdriver = require('selenium-webdriver');
// let until = require('selenium-webdriver/lib/until');


// let DEFAULT_TIMEOUT = 3000;
let REMOVED_TIMEOUT = 100;

// let REMOVE_TEXT_KEY_SEQ = Array(51).join(webdriver.Key.BACK_SPACE + webdriver.Key.DELETE);

// Unique symbols
let ELEMENT_MISSING        = Object.freeze({});
let ITEM_HIDDEN_OR_REMOVED = Object.freeze({});

export default function Page(browser) {
	this.ITEM_HIDDEN_OR_REMOVED = ITEM_HIDDEN_OR_REMOVED;

    this.css = {
        NEW_INPUT: '.new-todo',
        TOGGLE_ALL: '.toggle-all',
    };

	this.getMainSectionCss                  = ( ) => '.main';
	this.getFooterSectionCss                = ( ) => 'footer.footer';
	this.getClearCompletedButtonCss         = ( ) => 'button.clear-completed';
	this.getItemCountCss                    = ( ) => 'span.todo-count';
	this.getFilterCss                       = (i) => `.filters li:nth-of-type(${i+1}) a, .filters a:nth-of-type(${i+1})`;
	this.getSelectedFilterCss               = (i) => this.getFilterCss(i) + '.selected';
	this.getFilterAllCss                    = ( ) => this.getFilterCss(0);
	this.getFilterActiveCss                 = ( ) => this.getFilterCss(1);
	this.getFilterCompletedCss              = ( ) => this.getFilterCss(2);
	this.getListItemToggleCss               = (i) => this.getListItemCss(i, ' input.toggle');
	this.getListItemLabelCss                = (i) => this.getListItemCss(i, ' label');
	this.getLastListItemLabelCss            = (i) => this.getListItemCss(i, ':last-of-type label');
	this.getListItemInputCss                = (i) => this.getListItemCss(i, ' input.edit');
	this.getEditingListItemInputCss         = ( ) => this.getListItemCss(undefined, '.editing input.edit');
    this.getListCss                         = (suffixCss) => 'ul.todo-list' + (suffixCss || '');
	this.getListItemCss                     = (i, suffixCss, excludeParentSelector) => {
		suffixCss = (i === undefined ? '' : `:nth-of-type(${i+1})` + (suffixCss || ''));
		return excludeParentSelector ? 'li' + suffixCss : this.getListCss(' li' + suffixCss);
	};
	this.getListItemsWithCompletedStatesCss = (completedStates) =>
        this.getListCss(' ' + completedStates.map((completed, i) =>
            this.getListItemCss(i, completed ? '.completed' : ':not(.completed)', true)).join(' + '));


	this.back = function() {
		return browser.navigate().back();
	};

	// this.getElements = (css) =>
    //     browser.findElements(webdriver.By.css(css));
    //
	this.waitForElement = (css, failMsg, timeout) =>
        browser.wait(until.elementLocated(webdriver.By.css(css)), timeout || DEFAULT_TIMEOUT, failMsg);

	this.waitForFocusedElement = (css, failMsg) =>
        this.waitForElement(css + ':focus', failMsg);

	this.waitForBlurredElement = (css, failMsg) =>
        this.waitForElement(css + ':not(:focus)', failMsg);

	// this.waitForListItemCount = (count) => {
	// 	let self = this;
	// 	return browser.wait(() => {
	// 		return self.waitForElement(self.getListCss())
	// 			.then((listElement) => {
	// 				return listElement.findElements(webdriver.By.css(self.getListItemCss(undefined, undefined, true)));
	// 			})
	// 			.then((listItems) => {
	// 				return listItems.length === count;
	// 			});
	// 	}, DEFAULT_TIMEOUT, 'Expected item list to contain ' + count + ' item' + (count === 1 ? '' : 's'));
	// };

	this.waitForClearCompleteButton = () =>
        this.waitForElement(this.getClearCompletedButtonCss());

	this.waitForToggleForItem = (index) =>
        this.waitForElement(this.getListItemToggleCss(index));

	this.waitForItemLabel = (index) =>
        this.waitForElement(this.getListItemLabelCss(index));

	this.waitForNewItemInputField = () =>
        this.waitForElement(this.getNewInputCss());

	this.waitForMarkAllCompletedCheckBox = () =>
        this.waitForElement(this.getToggleAllCss());

	this.getListItems = () =>
        this.getElements(this.getListItemCss());

	// this.waitForVisibility = (shouldBeVisible, css, failMsg) => {
	// 	if (shouldBeVisible) {
	// 		return this.waitForElement(css, failMsg)
	// 			.then((element) =>
    //                 browser.wait(until.elementIsVisible(element), DEFAULT_TIMEOUT, failMsg));
	// 	} else {
	// 		return this.waitForElement(css, undefined, REMOVED_TIMEOUT)
	// 			.catch(() => ELEMENT_MISSING)
	// 			.then((elementOrError) =>
    //                 elementOrError === ELEMENT_MISSING ?
    //                     ELEMENT_MISSING :
    //                     browser.wait(until.elementIsNotVisible(elementOrError), DEFAULT_TIMEOUT, failMsg));
	// 	}
	// };

	this.waitForMainSectionRemovedOrEmpty = () => {
		return this.waitForElement(this.getMainSectionCss(), undefined, REMOVED_TIMEOUT)
			.catch(() => ELEMENT_MISSING)
			.then((elementOrError) =>
                elementOrError === ELEMENT_MISSING ? ELEMENT_MISSING : this.waitForListItemCount(0)
			);
	};

	// this.waitForCheckedStatus = (shouldBeChecked, failMsg, element) => {
	// 	let condition = shouldBeChecked ? 'elementIsSelected' : 'elementIsNotSelected';
	// 	return browser.wait(until[condition](element), DEFAULT_TIMEOUT, failMsg);
	// };

	// this.waitForTextContent = (text, failMsg, element) =>
    //     browser.wait(until.elementTextIs(element, text), DEFAULT_TIMEOUT, failMsg);

	// PAGE ACTIONS
	this.ensureAppIsVisibleAndLoaded = () => {
		return this.waitForVisibility(false, this.getFooterSectionCss(), 'Footer is not hidden')
			.then(this.waitForElement.bind(
				this, '.new-todo, #new-todo', 'Could not find new todo input field', undefined))
			.then((newTodoElement) => {
				return newTodoElement.getAttribute('id');
			})
			.then((newTodoElementId) => {
				if (newTodoElementId === 'new-todo') { return; }
			});
	};

	this.clickMarkAllCompletedCheckBox = () =>
        this.waitForMarkAllCompletedCheckBox().click();

	this.clickClearCompleteButton = () => {
		return this.waitForVisibility(true, this.getClearCompletedButtonCss(),
			'Expected clear completed items button to be visible')
			.then((clearCompleteButton) => {
				clearCompleteButton.click();
			});
	};

	// this.enterItem = (itemText) => {
	// 	let self = this;
	// 	let nItems;
	// 	return self.getListItems()
	// 		.then((items) => {
	// 			nItems = items.length;
	// 		})
	// 		.then(this.waitForNewItemInputField.bind(this))
	// 		.then((newItemInput) => {
	// 			return newItemInput.sendKeys(itemText).then(() => { return newItemInput; });
	// 		})
	// 		.then((newItemInput) => {
	// 			return browser.wait(() => {
	// 				// Hit Enter repeatedly until the text goes away
	// 				return newItemInput.sendKeys(webdriver.Key.ENTER)
	// 					.then(newItemInput.getAttribute.bind(newItemInput, 'value'))
	// 					.then((newItemInputValue) => {
	// 						return newItemInputValue.length === 0;
	// 					});
	// 			}, DEFAULT_TIMEOUT);
	// 		})
	// 		.then(() => self.waitForElement(self.getLastListItemLabelCss(nItems)))
	// 		.then(this.waitForTextContent(itemText.trim(),
	// 			'Expected new item label to read ' + itemText.trim()));
	// };

	this.toggleItemAtIndex = (index) =>
        this.waitForToggleForItem(index).click();

	// this.editItemAtIndex = (index, itemText) =>
	// 	this.waitForElement(this.getListItemInputCss(index)).then((itemEditField) =>
	// 			itemEditField.sendKeys(REMOVE_TEXT_KEY_SEQ, itemText));

	this.doubleClickItemAtIndex = (index) =>
        this.waitForItemLabel(index).then((itemLabel) =>
            browser.executeScript('var evt = document.createEvent("MouseEvents");' +
                'evt.initMouseEvent("dblclick",true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0,null);' +
                'arguments[0].dispatchEvent(evt);', itemLabel));

	this.filterBy = (filterCss) =>
        this.waitForElement(filterCss)
            .click()
            .then(this.waitForElement.bind(this, filterCss + '.selected', undefined, undefined));

	this.filterByActiveItems = () =>
        this.filterBy(this.getFilterActiveCss());

	this.filterByCompletedItems = () =>
        this.filterBy(this.getFilterCompletedCss());

	this.filterByAllItems = () =>
        this.filterBy(this.getFilterAllCss());
}
