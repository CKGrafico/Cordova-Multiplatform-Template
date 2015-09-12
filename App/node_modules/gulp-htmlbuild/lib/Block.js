'use strict';

function Block(config) {
  config = config || {};
  
  this.lines      = config.lines || [];
  this.target     = config.target || null;
  this.indent     = config.indent || '';
  this.lineNumber = config.lineNumber;
  this.args       = config.args || [];
}

module.exports = Block;
