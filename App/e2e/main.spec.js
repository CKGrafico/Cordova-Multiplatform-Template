'use strict';

describe('The home view', function () {
  var page;

  beforeEach(function () {
    browser.get('/index.html');
    page = require('./main.po');
  });

  it('should include 2 inputs', function() {
    expect(page.list.firstName.getAttribute('placeholder')).toBe('First Name');
    expect(page.list.lastName.getAttribute('placeholder')).toBe('Last Name');
  });

});
