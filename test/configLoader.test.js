'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const container = require('../bin/container');

describe('configLoader', function () {

    let fileResult;
    let configLoader;
    let fileHelperMethods;
    let childContainer;

    beforeEach(function () {
        childContainer = container.new();

        fileResult = {
            result: {
                files: './test/**.test.js',
                dest: './docs/api/'
            }
        };

        fileHelperMethods = {
            readJsonFile: sinon.spy(function () { return fileResult.result; }),
            isFile: () => true
        };

        function fileHelper() {
            return {
                isFile: (path) => fileHelperMethods.isFile(path),
                readJsonFile: (path) => fileHelperMethods.readJsonFile(path)
            };
        }

        childContainer.register(fileHelper);

        configLoader = childContainer.build('configLoader');
    });

    describe('loadConfig', function () {

        it('should load a config file from a user-defined path', function () {
            const filePath = './test/mochadocConfig.json'
            const result = configLoader.loadConfig(filePath, childContainer);

            assert.equal(fileHelperMethods.readJsonFile.args[0][0], filePath);
            assert.equal(result, fileResult.result);
        });

        it('should load a config file from .mochadocrc when no file is specified', function () {
            const result = configLoader.loadConfig(null, childContainer);

            assert.equal(fileHelperMethods.readJsonFile.args[0][0], './.mochadocrc');
            assert.equal(result, fileResult.result);
        });

        it('should load a config file from package.json when no file is specified and .mochadocrc is missing', function () {
            const configResult = fileResult.result;

            fileHelperMethods.isFile = (path) => path !== './.mochadocrc';
            fileResult.result = {
                mochadoc: configResult
            };

            const result = configLoader.loadConfig(null, childContainer);

            assert.equal(fileHelperMethods.readJsonFile.args[0][0], './package.json');
            assert.equal(result, configResult);
        });

        it('should throw an error when config is malformed', function () {
            fileResult.result = { foo: 'bar' };

            assert.throws(configLoader.loadConfig, `Cannot find mochadoc configuration or configuration is malformed!`);
        });

        it('should throw an error when config in package.json is missing', function () {
            fileHelperMethods.isFile = (path) => path !== './.mochadocrc';
            fileResult.result = {};

            assert.throws(configLoader.loadConfig, `Cannot find mochadoc configuration or configuration is malformed!`);
        });

        it('should throw an error if no configuration file is found', function () {
            fileHelperMethods.isFile = () => false;

            assert.throws(configLoader.loadConfig, `Cannot find mochadoc configuration or configuration is malformed!`);
        });

    });

});
