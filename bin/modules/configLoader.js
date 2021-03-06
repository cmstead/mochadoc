'use strict';

const signet = require('../signet-types.js');

function configLoader(fileHelper) {

    const defaultRcFilePath = './.mochadocrc';
    const defaultPackageFilePath = './package.json';

    const buildFilePathConfigLoader =
        (filePath) => () => fileHelper.readJsonFile(filePath);

    const loadNull = () => null;

    const loadConfigFromPackage =
        () => fileHelper.readJsonFile(defaultPackageFilePath).mochadoc;

    const loadConfigFromRcFile = buildFilePathConfigLoader(defaultRcFilePath);

    function getDefaultLoader() {
        let configLoader = loadNull;

        if (fileHelper.isFile(defaultRcFilePath)) {
            configLoader = loadConfigFromRcFile;
        } else if (fileHelper.isFile(defaultPackageFilePath)) {
            configLoader = loadConfigFromPackage;
        }

        return configLoader
    }

    const getConfigLoader =
        (optionalFilePath) =>
            signet.isTypeOf('filePath')(optionalFilePath)
                ? buildFilePathConfigLoader(optionalFilePath)
                : getDefaultLoader();

    function returnConfigOrThrow(config) {
        if (!signet.isTypeOf('mochadocConfig')(config)) {
            throw new Error('Cannot find mochadoc configuration or configuration is malformed!');
        }

        return config;
    }

    function loadConfig(filePath, container) {
        const loadedConfig = returnConfigOrThrow(getConfigLoader(filePath)());
        container.register(function config() { return loadedConfig; });

        return loadedConfig;
    }

    return {
        loadConfig: signet.enforce(
            '[variant<null, filePath>] => mochadocConfig',
            loadConfig)
    };
}

module.exports = configLoader;
