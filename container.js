'use strict'

var sep = require('path').sep;

var config = {
    cwd: __dirname + sep + 'bin',
    modulePaths: [
        'modules'
    ],
    allowOverride: false,
    eagerLoad: false
};

module.exports = require('dject').new(config);