Mochadoc - The Mocha/Jasmine Test To API Doc Tool
=================================================

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
        "files": "./test/**/*.js",
        "dest": "./docs/api"
    }
}
```

**Create a standalone configuration by creating a .mochadocrc file like this:**

```
{
    "files": "./test/**/*.js",
    "dest": "./docs/api"
}
```

## Running Mochadoc ##

To create documentation from your test files, simply type 'mochadoc' in your project dorectory (the same directory with the configuration file or package.json) like this:

`mochadoc`

**That's all for now!**

## Changelog ##

**v0.1.1**

- Initial release of mochadoc
- Reads tests using glob syntax
- Writes raw (unstyled) HTML docs to specified destination