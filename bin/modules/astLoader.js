'use strict';

const signet = require('../signet-types');

function astLoader(
    codeParser,
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
            fileContents: fileRecord.fileContents,
            sourceAst: codeParser.parseCode(fileRecord.fileContents)
        }
    }

    function splitTestSource(fileRecord) {
        return {
            filePath: fileRecord.filePath,
            fileLines: fileRecord.fileContents.split(/\r?\n/gi),
            sourceAst: fileRecord.sourceAst
        };
    }

    function loadFileAsts(fileData) {
        return fileData
            .map(function (filePath) {
                return splitTestSource(
                    parseFileContents(
                        getFileAndPath(filePath)));
            });
    }

    return {
        loadFileAsts: signet.enforce(
            'globPatternData => array<fileAstRecord>',
            loadFileAsts)
    };

}

module.exports = astLoader;
