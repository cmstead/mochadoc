#!/usr/bin/env node

const container = require('./bin/container');
const configLoader = container.build('configLoader');

const config = configLoader.loadConfig();

(config);