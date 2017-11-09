'use strict';

function titleDataLoader(
    config,
    astLoader,
    titlePicker,
    dataConsolidator,
    fileGlobber,
    logger) {

    function loadTitleData() {
        logger.log('Loading files... ');

        const fileData = fileGlobber.globFiles(config.files);

        logger
            .success('done').crlf()
            .log('Parsing file content... ');

        const fileAstData = astLoader.loadFileAsts(fileData);

        logger
            .success('done').crlf()
            .log('Capturing test description data... ');

        const titleData = fileAstData.reduce(titlePicker.pickTitles, []);

        logger.success('done').crlf();

        return dataConsolidator.consolidateDescriptionData(titleData);
    }

    return {
        loadTitleData: loadTitleData
    };

}

module.exports = titleDataLoader;