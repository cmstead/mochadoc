'use strict';

function titleDataLoader(
    config,
    astLoader,
    titlePicker,
    dataConsolidator) {

    function loadTitleData() {
        const titleData = astLoader
            .loadFileAsts(config.files)
            .reduce(titlePicker.pickTitles, []);
        
        return dataConsolidator.consolidateDescriptionData(titleData);
    }

    return {
        loadTitleData: loadTitleData
    };

}

module.exports = titleDataLoader;