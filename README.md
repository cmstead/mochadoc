Mochadoc - The Mocha/Jasmine/Jest Test To API Doc Tool
======================================================

## Setup ##

First install Mochadoc globally from NPM:

`npm install -g mochadoc`

Once installed, create a configuration in your package folder.  This can be done by adding a mochadoc object to your package.json file or by creating a .mochadocrc config file.  Examples below:

**Add configuration to your package.json like this:**

```
{
    "scripts": {
        ...
    },
    "mochadoc": {
        "projectName": "My Amazing Project",
        "files": "./test/**/*.js",
        "dest": "./docs/api"
    }
}
```

**Create a standalone configuration by creating a .mochadocrc file like this:**

```
{
    "projectName": "My Amazing Project",
    "files": "./test/**/*.js",
    "dest": "./docs/api"
}
```

## Running Mochadoc ##

To create documentation from your test files, simply type 'mochadoc' in your project dorectory (the same directory with the configuration file or package.json) like this:

`mochadoc`

**That's all for now!**

## Changelog ##

**v0.3.0**

- Added styles and formatting
- Updated config handler to use projectName property

**v0.2.1**

- Updated to handle cases where describe blocks are not used
- Added support for Jest "test" syntax instead of "it"
- Improved description argument handling for non-string values

**v0.1.1**

- Initial release of mochadoc
- Reads tests using glob syntax
- Writes raw (unstyled) HTML docs to specified destination