'use strict';

const fs = require('fs');
const signet = require('../signet-types');
const sep = require('path').sep;

function fileHelper() {

    function isFile(filePath) {
        try {
            return fs.lstatSync(filePath).isFile();
        } catch (e) {
            return false;
        }
    }

    function isDirectory(path) {
        try {
            return fs.lstatSync(path).isDirectory();
        } catch (e) {
            return false;
        }
    }

    function copyFile(sourcePath, destPath) {
        return function (fileName) {
            const sourceFilePath = sourcePath + fileName;
            const destFilePath = destPath + fileName;

            const sourceStream = fs.createReadStream(sourceFilePath);
            const destStream = fs.createWriteStream(destFilePath);

            sourceStream.on('error', function () {
                console.log('Unable to copy file ' + fileName);
            })

            sourceStream.pipe(destStream);
        };
    }

    function readFile(filePath) {
        if (isFile(filePath)) {
            return fs.readFileSync(filePath, 'utf8');
        } else {
            throw new Error(`No file exists at ${filePath}.`);
        }
    }

    function readJsonFile(filePath) {
        var fileContent = readFile(filePath);

        try {
            return JSON.parse(fileContent);
        } catch (e) {
            throw new Error(`File at path ${filePath} does not contain a parseable JSON string.`);
        }
    }

    function readFiles(filePaths) {
        return filePaths.map(readFile);
    }

    function createIfDoesNotExist(path) {
        if (!isDirectory(path)) {
            fs.mkdirSync(path);
        }
    }

    function buildCleanDest(dest) {
        return dest.split(/[/\\]/ig).reduce(function (currentPath, token) {
            const cleanToken = token.trim();

            return cleanToken !== ''
                ? currentPath + token + sep
                : currentPath
        }, '');

    }

    function createDirectoryStructure(dest) {
        let path = '';

        dest.split(/[/\\]/ig).forEach(function (token) {
            path += token + sep;

            if (!/^[.]{1,2}$/.test(token)) {
                createIfDoesNotExist(path);
            }
        });
    }

    return {
        buildCleanDest: signet.enforce(
            'filePath => filePath',
            buildCleanDest),
        copyFile: signet.enforce(
            'filePath => filePath => undefined',
            copyFile),
        createDirectoryStructure: signet.enforce(
            'filePath => undefined',
            createDirectoryStructure),
        createIfDoesNotExist: signet.enforce(
            'filePath => undefined',
            createIfDoesNotExist),
        isFile: signet.enforce(
            'filePath => boolean',
            isFile),
        isDirectory: signet.enforce(
            'filePath => boolean',
            isDirectory),
        readFile: signet.enforce(
            'filePath => fileContents: string',
            readFile),
        readFiles: signet.enforce(
            'filePaths => fileContents: array<string>',
            readFiles),
        readJsonFile: signet.enforce(
            'filePath => fileContents: object',
            readJsonFile)
    };

}

module.exports = fileHelper;