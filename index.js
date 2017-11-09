#!/usr/bin/env node

const chalk = require('chalk');
const container = require('./bin/container');
const logger = container.build('logger');

logger
    .crlf()
    .log(chalk.white.bold('Starting Mochadoc'))
    .crlf().crlf();

container.build('configLoader').loadConfig(null, container);
const config = container.build('config');

const titleData = container.build('titleDataLoader').loadTitleData();
const htmlFileData = container.build('htmlBuilder').buildHtml(titleData);

logger.log('Writing files... ');

container.build('fileWriter').writeAllFiles(htmlFileData);

logger.success('done').crlf();

logger
    .crlf()
    .log('Files written to ' + config.dest).crlf()
    .success('Document generation complete.').crlf().crlf();