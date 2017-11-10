'use strict';

const prompt = require('inquirer').createPromptModule();
const fs = require('fs');

function configBuilder() {

    function validateString(value) {
        return value !== '';
    }

    function writeResults(responses) {
        const configObj = {
            projectName: responses.projectName,
            files: responses.files,
            dest: responses.dest
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
