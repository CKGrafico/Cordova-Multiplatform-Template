/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.list = element(by.css('.list'));
  this.list.firstName = this.list.element(by.css('#firstNameInput'));
  this.list.lastName = this.list.element(by.css('#lastNameInput'));
};

module.exports = new MainPage();
