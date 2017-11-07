#!/usr/bin/env node

const container = require('./bin/container');
container.build('configLoader').loadConfig(null, container);

const titleData = container.build('titleDataLoader').loadTitleData();
const htmlFileData = container.build('htmlBuilder').buildHtml(titleData);

container.build('fileWriter').writeAllFiles(htmlFileData);