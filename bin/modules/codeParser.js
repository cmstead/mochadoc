'use strict';

const esprima = require('esprima');
const signet = require('../signet-types');

function codeParser() {

    function parseCode(source) {
        return esprima.parse(source, { loc: true });
    }

    function parseAll(sourceStrings) {
        return sourceStrings.map(parseCode);
    }

    return {
        parseCode: signet.enforce(
            'sourceCode => sourceAst',
            parseCode),
        parseAll: signet.enforce(
            'array<sourceCode> => array<sourceAst>',
            parseAll)
    };
}

module.exports = codeParser;