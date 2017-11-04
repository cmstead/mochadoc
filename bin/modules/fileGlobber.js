'use strict';

const glob = require('glob');
const signet = require('../signet-types');

function fileGlobber() {

    function pushAll(baseValues, newValues) {
        const pushValue = (result, value) => result.push(value);

        return newValues.reduce(pushValue, baseValues);
    }

    function globPattern(globPattern) {
        return glob.sync(globPattern);
    }

    function globPatterns(globPatterns) {
        return globPatterns
            .map(globPattern)
            .reduce(pushAll, []);
    }

    function globFiles(globPatternData) {
        const globAction = signet.isTypeOf('array')(globPatternData)
            ? globPatterns
            : globPattern;

        return globAction(globPatternData);
    }

    return {
        globFiles: signet.enforce(
            'globPatternData => array<filePath>',
            globFiles)
    }
}

module.exports = fileGlobber;