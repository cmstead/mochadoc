'use strict';

const getUsage = require('command-line-usage');

function cliUsageBuilder () {

    const sections = [
        {
            header: 'Mochadoc - the fast, easy test to document utility',
            content: 'Generates documents from Mocha BDD, Jasmine and Jest test files.'
        },
        {
            header: 'Synopsis',
            content: [
                '$ mochadoc [--silent] [--json] [--config path/to/file]',
                '$ mochadoc [--help|-h]'
            ]
        },
        {
            header: 'Options',
            optionList: [
                {
                    name: 'config',
                    alias: 'c',
                    typeLabel: '[italic]{filePath}',
                    description: 'Alternate location for config file'
                },
                {
                    name: 'dryrun',
                    description: 'Does everything except write to file system'
                },
                {
                    name: 'help',
                    alias: 'h',
                    description: 'Outputs command docs'
                },
                {
                    name: 'json',
                    description: 'Outputs title raw JSON to stdout'
                },
                {
                    name: 'silent',
                    alias: 's',
                    description: 'Turns off all logging'
                }
            ]
        }
    ]

    return getUsage(sections);

}

module.exports = cliUsageBuilder;