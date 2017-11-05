'use strict';

const signet = require('../signet-types');

function astLoader(
    codeParser,
    fileGlobber,
    fileHelper) {

    function getFileAndPath(filePath) {
        return {
            filePath: filePath,
            fileContents: fileHelper.readFile(filePath)
        }
    }

    function parseFileContents(fileRecord) {
        return {
            filePath: fileRecord.filePath,
            sourceAst: codeParser.parseCode(fileRecord.fileContents)
        }
    }

    function loadFileAsts(globPatternData) {
        return fileGlobber
            .globFiles(globPatternData)
            .map(getFileAndPath)
            .map(parseFileContents);
    }

    return {
        loadFileAsts: signet.enforce(
            'globPatternData => array<fileAstRecord>', 
            loadFileAsts)
    };

}

module.exports = astLoader;