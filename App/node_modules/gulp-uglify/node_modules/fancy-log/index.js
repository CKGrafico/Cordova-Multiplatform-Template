'use strict';
/*
  Initial code from https://github.com/gulpjs/gulp-util/blob/v3.0.6/lib/log.js
 */
var chalk = require('chalk');
var dateformat = require('dateformat');

module.exports = function(){
  var time = '['+chalk.grey(dateformat(new Date(), 'HH:MM:ss'))+']';
  process.stdout.write(time + ' ');
  console.log.apply(console, arguments);
  return this;
};
