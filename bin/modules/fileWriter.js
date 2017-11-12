'use strict';

const fs = require('fs');
const sep = require('path').sep;
const rimraf = require('rimraf');

function fileWriter(
    config,
    fileHelper) {

    const createDirectoryStructure = fileHelper.createDirectoryStructure;
    const buildCleanDest = fileHelper.buildCleanDest;
    const copyFile = fileHelper.copyFile;

    function createDocumentDirectories(dest) {
        createDirectoryStructure(dest);
        createDirectoryStructure(dest + 'details' + sep);
        createDirectoryStructure(dest + 'assets' + sep);
    }

    function copyAssets(dest) {
        const sourcePath = __dirname + '/../../assets/';
        const destPath = dest + sep + 'assets' + sep;

        const docAssets = [
            'doc-style.css',
            'github-gist.css',
            'highlight.pack.js',
            'code-collapse.js'
        ];

        docAssets.forEach(copyFile(sourcePath, destPath));
    }

    function writeAllFiles(docFiles) {
        const cleanDest = buildCleanDest(config.dest);

        rimraf.sync(cleanDest);
        createDocumentDirectories(cleanDest);

        docFiles.forEach(function (fileData) {
            const filePath = fileData.fileName === 'index.html'
                ? cleanDest + fileData.fileName
                : cleanDest + 'details' + sep + fileData.fileName;

            fs.writeFileSync(filePath, fileData.fileContent);
        });

        copyAssets(cleanDest);
    }

    return {
        writeAllFiles: writeAllFiles
    };

}

module.exports = fileWriter;