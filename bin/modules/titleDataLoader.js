'use strict';

function titleDataLoader(
    config,
    astLoader,
    titlePicker) {

    function loadTitleData() {
        return astLoader
            .loadFileAsts(config.files)
            .reduce(titlePicker.pickTitles, []);
    }

    return {
        loadTitleData: loadTitleData
    };

}

module.exports = titleDataLoader;