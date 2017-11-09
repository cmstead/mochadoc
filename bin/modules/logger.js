'use strict';

const chalk = require('chalk');
const process = require('process');

function logger(cliOptions) {

    let api = {};

    function write(message) {
        if(!cliOptions.silent) {
            process.stdout.write(message);
        }

        return api;
    }

    function success(message) {
        return write(chalk.green(message));
    }

    function log(message) {
        return write(message);
    }

    function error(message) {
        return write(chalk.red(message));
    }

    function crlf() {
        return write('\n');
    }

    api.crlf = crlf;
    api.error = error;
    api.log = log;
    api.success = success;

    return api;
}

module.exports = logger;