'use strict';

const signet = require('signet')();

function isSourceAst(value) {
    return value.type === 'Program';
}

signet.alias('filePath', 'string');
signet.alias('filePaths', 'array<filePath>');
signet.alias('globPattern', 'string');
signet.alias('globPatterns', 'array<globPattern>');
signet.alias('globPatternData', 'variant<globPattern, globPatterns>');
signet.alias('sourceCode', 'string');

signet.subtype('object')('sourceAst', isSourceAst);

signet.subtype('object')('astLiteral', function(value) {
    return value !== null && value.type === 'Literal';
});

signet.defineDuckType('mochadocConfig', {
    files: 'globPatternData',
    dest: 'filePath'
});

signet.defineDuckType('fileAstRecord', {
    filePath: 'filePath',
    sourceAst: 'sourceAst'
});

module.exports = signet;