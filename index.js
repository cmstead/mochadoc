#!/usr/bin/env node

const container = require('./bin/container');

const configLoader = container.build('configLoader');
const astLoader = container.build('astLoader');
const titlePicker = container.build('titlePicker');

const config = configLoader.loadConfig();

const fileAsts = astLoader.loadFileAsts(config.files);

const testTitles = fileAsts.reduce(titlePicker.pickTitles, []);

(testTitles);