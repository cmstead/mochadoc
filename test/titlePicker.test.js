'use strict';

// const sinon = require('sinon');
const container = require('../bin/container');

require('./test-utilities/approvals-config');

describe('configLoader', function () {

    let astLoader;
    let titlePicker;

    beforeEach(function () {
        const childContainer = container.new();

        astLoader = childContainer.build('astLoader');
        titlePicker = childContainer.build('titlePicker');
    });
    
    it('should generate a tree of test descriptions from file asts', function() {
        const globPattern = './test/fixtures/*.test.js';
        const asts = astLoader.loadFileAsts(globPattern);
        const titles = titlePicker.pickAllTitles(asts);

        this.verify(JSON.stringify(titles, null, 4));
    });

});