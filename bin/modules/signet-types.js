'use strict';

const signet = require('signet')();

signet.defineDuckType('mochadocConfig', {
    files: 'variant<string, array<string>>',
    dest: 'string'
});

signet.alias('filePath', 'string');

module.exports = signet;