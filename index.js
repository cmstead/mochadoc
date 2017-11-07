#!/usr/bin/env node

const fs = require('fs');

const container = require('./bin/container');
container.build('configLoader').loadConfig(null, container);

const titleData = container.build('titleDataLoader').loadTitleData();
const output = container.build('htmlBuilder').buildHtml(titleData);

fs.writeFileSync('./temp.html', output[0].fileContent);