#!/usr/bin/env node

const container = require('./bin/container');

const configLoader = container.build('configLoader');
const fileGlobber = container.build('fileGlobber');
const fileHelper = container.build('fileHelper');
const codeParser = container.build('codeParser');

const config = configLoader.loadConfig();
const filePaths = fileGlobber.globFiles(config.files);
const fileContents = fileHelper.readFiles(filePaths);

console.log(codeParser.parseAll(fileContents));