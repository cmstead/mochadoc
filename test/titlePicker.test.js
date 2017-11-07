'use strict';

const assert = require('chai').assert;
const container = require('../bin/container');

require('./test-utilities/approvals-config');

describe('titlePicker', function () {

    let astLoader;
    let titlePicker;

    beforeEach(function () {
        const childContainer = container.new();

        astLoader = childContainer.build('astLoader');
        titlePicker = childContainer.build('titlePicker');
    });

    describe('pickAllTitles', function () {

        it('should generate a tree of test descriptions from file asts', function () {
            const globPattern = './test/fixtures/*.test.js';
            const asts = astLoader.loadFileAsts(globPattern);
            const titles = titlePicker.pickAllTitles(asts);

            this.verify(JSON.stringify(titles, null, 4));
        });

        it('should throw an error if test files contain an only declaration', function () {
            const globPattern = './test/fixtures/*.bad.js';
            const asts = astLoader.loadFileAsts(globPattern);

            assert.throws(titlePicker.pickAllTitles.bind(null, asts));
        });

    });

});