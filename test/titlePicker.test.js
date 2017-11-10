'use strict';

const assert = require('chai').assert;
const container = require('../bin/container');
const fs = require('fs');

require('./test-utilities/approvals-config');

describe('titlePicker', function () {

    let fileGlobber;
    let astLoader;
    let titlePicker;

    beforeEach(function () {
        const childContainer = container.new();

        fileGlobber = childContainer.build('fileGlobber');
        astLoader = childContainer.build('astLoader');
        titlePicker = childContainer.build('titlePicker');
    });

    describe('pickAllTitles', function () {

        it('should generate a tree of test descriptions from file asts', function () {
            const globPattern = './test/fixtures/*.test.js';
            const fileData = fileGlobber.globFiles(globPattern);
            const asts = astLoader.loadFileAsts(fileData);
            const titles = titlePicker.pickAllTitles(asts);

            this.verify(JSON.stringify(titles, null, 4));
        });

        it('should properly collect data from a jest test', function () {
            fs.writeFileSync('./temp.json', '[]');

            const globPattern = './test/fixtures/*.jest.js';
            const fileData = fileGlobber.globFiles(globPattern);
            const asts = astLoader.loadFileAsts(fileData);
            const titles = titlePicker.pickAllTitles(asts);

            this.verify(JSON.stringify(titles, null, 4));
        });

        it('should throw an error if test files contain an only declaration', function () {
            const globPattern = './test/fixtures/*.bad.js';
            const fileData = fileGlobber.globFiles(globPattern);
            const asts = astLoader.loadFileAsts(fileData);

            assert.throws(titlePicker.pickAllTitles.bind(null, asts));
        });

    });

});
