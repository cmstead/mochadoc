'use strict';

const fs = require('fs');
const signet = require('./signet-types');

function fileHelper() {

    function isFile(filePath) {
        try{
            return fs.lstatSync(filePath).isFile();
        } catch (e) {
            return false;
        }
    }

    function readFile(filePath) {
        if(isFile(filePath)) {
            return fs.readFileSync(filePath, 'utf8');
        } else {
            throw new Error(`No file exists at ${filePath}.`);
        }
    }

    function readJsonFile(filePath) {
        var fileContent = readFile(filePath);

        try{
            return JSON.parse(fileContent);
        } catch (e) {
            throw new Error(`File at path ${filePath} does not contain a parseable JSON string.`);
        }
    }

    return {
        isFile: signet.enforce(
            'filePath => boolean', 
            isFile),
        readFile: signet.enforce(
            'filePath => fileContents: string',
            readFile),
        readJsonFile: signet.enforce(
            'filePath => fileContents: object',
            readJsonFile)
    };

}

module.exports = fileHelper;