#!/usr/bin/env node

const container = require('./bin/container');

const options = container.build('cliOptionBuilder').getOptions(container);

if (options.init) {
    container.build('configBuilder').buildConfig();
} else if (options.help) {
    container.build('cliUsageBuilder').displayUsageInfo();
} else {
    container.build('docBuilder').buildDocs(container, options);
}
