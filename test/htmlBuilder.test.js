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
                projectName: 'My Project',
                files: globPattern,
                dest: ''
            };
        });

        childContainer.register(function cliOptions() {
            return {};
        });

        const fileData = childContainer.build('fileGlobber').globFiles(globPattern);
        const astData = childContainer.build('astLoader').loadFileAsts(fileData);
        const pickTitles = childContainer.build('titlePicker').pickTitles;

        const rawTitleData = astData.reduce(pickTitles, []);
        titleData = childContainer.build('dataConsolidator').consolidateDescriptionData(rawTitleData);

        htmlBuilder = childContainer.build('htmlBuilder');
    });

    describe('buildHtml', function () {

        it('should properly generate an AST from a test file in the filesystem', function () {
            const outputHtml = htmlBuilder.buildHtml(titleData);
            this.verify(JSON.stringify(outputHtml, null, 4));
        });

    });
});
