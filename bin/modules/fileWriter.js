'use strict';

const fs = require('fs');
const sep = require('path').sep;
const rimraf = require('rimraf');

function fileWriter(config) {

    function buildCleanDest(dest) {
        return dest.split(/[/\\]/ig).reduce(function (currentPath, token) {
            const cleanToken = token.trim();

            return cleanToken !== ''
                ? currentPath + token + sep
                : currentPath
        }, '');

    }

    function isDirectory(path) {
        try {
            return fs.lstatSync(path).isDirectory();
        } catch (e) {
            return false;
        }
    }

    function createIfDoesNotExist(path) {
        if (!isDirectory(path)) {
            fs.mkdirSync(path);
        }
    }

    function createDirectoryStructure(dest) {
        let path = '';

        dest.split(/[/\\]/ig).forEach(function (token) {
            path += token + sep;

            if (!/^[.]{1,2}$/.test(token)) {
                createIfDoesNotExist(path);
            }
        });

        createIfDoesNotExist(dest + 'details' + sep);
        createIfDoesNotExist(dest + 'assets' + sep);
    }

    function copyFile(dest) {
        return function (fileName) {
            const sourcePath = __dirname + '/../../assets/' + fileName;
            const destPath = dest + sep + 'assets' + sep + fileName;

            const sourceStream = fs.createReadStream(sourcePath);
            const destStream = fs.createWriteStream(destPath);

            sourceStream.on('error', function () {
                console.log('Unable to copy file ' + fileName);
            })

            sourceStream.pipe(destStream);
        };
    }

    function copyAssets(dest) {
        const docAssets = [
            'doc-style.css',
            'github-gist.css',
            'highlight.pack.js',
            'code-collapse.js'
        ];

        docAssets.forEach(copyFile(dest));
    }

    function writeAllFiles(docFiles) {
        const cleanDest = buildCleanDest(config.dest);

        rimraf.sync(cleanDest);
        createDirectoryStructure(cleanDest);

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