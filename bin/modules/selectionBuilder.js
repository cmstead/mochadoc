'use strict';

function selectionBuilder() {

    function buildSelection(coords, sourceLines) {
        const startLine = coords.start.line;
        const endLine = coords.end.line;

        const endOffset = coords.end.line - coords.start.line;
        
        let selectedLines = sourceLines.slice(startLine - 1, endLine);

        selectedLines[0] = selectedLines[0].substr(coords.start.column);
        selectedLines[endOffset] = selectedLines[endOffset].substr(0, coords.end.column);

        return selectedLines.join('\n');
    }

    return {
        buildSelection: buildSelection
    };

}

module.exports = selectionBuilder;