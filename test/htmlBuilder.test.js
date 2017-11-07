'use strict';

const container = require('../bin/container');

require('./test-utilities/approvals-config');

describe('htmlBuilder', function () {

    let titleData;
    let htmlBuilder;

    beforeEach(function () {
        const childContainer = container.new();
        const globPattern = './test/fixtures/*.test.js';

        childContainer.register(function config() {
            return {
                files: globPattern,
                dest: ''
            };
        });

        htmlBuilder = childContainer.build('htmlBuilder');
        titleData = childContainer.build('titleDataLoader').loadTitleData();
    });

    describe('buildHtml', function () {

        it('should properly generate an AST from a test file in the filesystem', function () {
            const outputHtml = htmlBuilder.buildHtml(titleData);
            this.verify(JSON.stringify(outputHtml, null, 4));
        });

    });
});