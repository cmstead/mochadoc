'use strict';

function cliOptionBuilder() {

    function getOptions(container) {
        const commandLineArgs = require('command-line-args');

        const cliOptionDefinitions = [
            { name: 'config', alias: 'c', type: String },
            { name: 'dryrun', type: Boolean },
            { name: 'help', alias: 'h', type: Boolean },
            { name: 'init', type: Boolean },
            { name: 'json', type: Boolean },
            { name: 'silent', alias: 's', type: Boolean }
        ];

        const options = commandLineArgs(cliOptionDefinitions);

        options.silent = options.silent || options.json;

        container.register(function cliOptions() { return options; });

        return options;
    }

    return {
        getOptions: getOptions
    }
}

module.exports = cliOptionBuilder;
