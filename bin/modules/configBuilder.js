'use strict';

const prompt = require('inquirer').createPromptModule();
const fs = require('fs');

function configBuilder() {

    function validateString(value) {
        return value !== '';
    }

    function last (values){
        return values[values.length - 1];
    }

    function cleanDestPath(dest) {
        const destTokens = dest.split(/[\\/]/ig).map(token => token.trim());
        return last(destTokens) === ''
            ? destTokens.join('/')
            : destTokens.concat(['']).join('/');
    }

    function writeResults(responses) {
        const configObj = {
            projectName: responses.projectName,
            files: responses.files,
            dest: cleanDestPath(responses.dest)
        };

        fs.writeFileSync('.mochadocrc', JSON.stringify(configObj, null, 4));
        console.log('Mochadoc config written to ./.mochadocrc');
    }

    function buildConfig() {

        prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'The name of your project: ',
                validate: validateString
            },
            {
                type: 'input',
                name: 'files',
                message: 'Test files location (glob patterns okay): ',
                validate: validateString
            },
            {
                type: 'input',
                name: 'dest',
                message: 'Destination for document files: ',
                validate: validateString
            }
        ]).then(writeResults);

    }

    return {
        buildConfig: buildConfig
    };

}

module.exports = configBuilder;
