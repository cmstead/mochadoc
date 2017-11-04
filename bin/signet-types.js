'use strict';

const signet = require('signet')();

signet.alias('fileGlob', 'string');
signet.alias('filePath', 'string');

signet.defineDuckType('mochadocConfig', {
    files: 'variant<fileGlob, array<fileGlob>>',
    dest: 'filePath'
});

module.exports = signet;