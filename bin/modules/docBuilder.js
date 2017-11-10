'use strict';

const chalk = require('chalk');

function docBuilder() {

    function loadConfigOrDie(container, options) {
        try {
            return container.build('configLoader').loadConfig(options.config, container);
        } catch (e) {
            console.log(chalk.red('Config error: ') + e.message + '\n');
            console.log('For information on using mochadoc, type "mochadoc --help" at the command line \n');

            process.exit(1);
        }
    }

    function buildDocs(container, options) {
        const logger = container.build('logger');

        logger
            .crlf()
            .log(chalk.white.bold('Starting Mochadoc'))
            .crlf().crlf();

        const config = loadConfigOrDie(container, options);

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
    }

    return {
        buildDocs: buildDocs
    };

}

module.exports = docBuilder;
