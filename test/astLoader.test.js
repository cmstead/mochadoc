'use strict';

// const sinon = require('sinon');
const container = require('../bin/container');

require('./test-utilities/approvals-config');

describe('astLoader', function () {

    let astLoader;

    beforeEach(function () {
        const childContainer = container.new();

        astLoader = childContainer.build('astLoader');
    });

    describe('loadFileAsts', function () {

        it('should properly generate an AST from a test file in the filesystem', function () {
            const globPattern = './test/fixtures/testFixture.0.test.js';
            const ast = astLoader.loadFileAsts(globPattern);

            this.verify(JSON.stringify(ast, null, 4));
        });

        it('should properly generate ASTs from multiple test files in the filesystem', function () {
            const globPattern = './test/fixtures/*.test.js';
            const ast = astLoader.loadFileAsts(globPattern);

            this.verify(JSON.stringify(ast, null, 4));
        });

    });
});