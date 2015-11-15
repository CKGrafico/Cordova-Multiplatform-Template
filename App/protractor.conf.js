'use strict';

var conf = require('./tasks/paths');

// An example configuration file.
exports.config = {
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json
//npm in
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8100',
  allScriptsTimeout: 20000,
  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: [conf.e2e],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function(result) {console.log(result)}
  }
};
