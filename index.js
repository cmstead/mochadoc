#!/usr/bin/env node

const chalk = require('chalk');
const container = require('./bin/container');
const process = require('process');

const options = container.build('cliOptionBuilder').getOptions(container);

if(options.help){
    const usageInfo = container.build('cliUsageBuilder');
    
    console.log(usageInfo);

    process.exit(0);
}

const logger = container.build('logger');

logger
    .crlf()
    .log(chalk.white.bold('Starting Mochadoc'))
    .crlf().crlf();

container.build('configLoader').loadConfig(options.config, container);
const config = container.build('config');

const titleData = container.build('titleDataLoader').loadTitleData();

const htmlFileData = !options.json
    ? container.build('htmlBuilder').buildHtml(titleData)
    : '';

if (!options.dryrun && options.json) {
    console.log(JSON.stringify(titleData));
}

if (!options.dryrun && !options.json) {

    logger.log('Writing files... ');

    container.build('fileWriter').writeAllFiles(htmlFileData);

    logger.success('done')
        .crlf()
        .crlf()
        .log('Files written to ' + config.dest);
}

logger.crlf().success('Document generation complete.').crlf().crlf();