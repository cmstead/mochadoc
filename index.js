#!/usr/bin/env node

const container = require('./container');
const configLoader = container.build('configLoader');

configLoader.loadConfig();