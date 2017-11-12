Mochadoc
========

The dead simple way to create docs from Mocha BDD, Jasmine and Jest tests.

## Setup ##

First install Mochadoc globally from NPM:

`npm install -g mochadoc`

After installation, open a console/terminal in your project root directory and set up a new mochadoc configuration with the following command:

`mochadoc --init`

If you would prefer to have your configuration in your package file, you can create it by hand.  The format is detailed below.

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

The config file can be stored elsewhere and referenced with the `--config` flag.

## Running Mochadoc ##

Mochadoc has a rich CLI option set.  By default, verbose mode is enabled, and file writing is the core behavior.  Mochadoc will automatically search for a config file in the directory it is called from.  Basic execution is as follows:

`mochadoc`

For a list of the entire set of options, run mochadoc with the help option:

`mochadoc --help`

The option which is most likely to be useful is the alternate configuration option:

`mochadoc --config path/to/config/file`

## Mochadoc Help Output ##

__Mochadoc - the fast, easy test to document utility__

  Generates documents from Mocha BDD, Jasmine and Jest test files.

__Synopsis__

Examples of use:

```bash
$ mochadoc --help
$ mochadoc --init
$ mochadoc [--silent] [--json] [--config path/to/file]
```

__Options__

| Switch | Input Type | Description |
| --- | --- | --- |
| -c, --config | filePath | Alternate location for config file|
| --dryrun | | Does everything except write to file system |
| -h, --help | | Outputs command docs |
| --init | | Generates a new mochadocrc file |
| --json | | Outputs title raw JSON to stdout |
| -s, --silent | | Turns off all logging |

## Changelog ##

**v0.7.0**

- Added code sample collapsing in generated docs for easier scanning

**v0.6.0**

- Added init behavior
- Improved tests around internal code
- Updated error messaging when mochadoc config is missing

**v0.5.0**

- Added CLI options

**v0.4.1**

- Alphabetized results on index page
- Fixed underline bug in header

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
