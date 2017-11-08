'use strict';

const signet = require('../signet-types');
const handlebars = require('handlebars/runtime');
require('../../templates/templates');

const templates = handlebars.templates;

function htmlBuilder() {

    function itBuilder(descriptionData) {
        return templates.testItem(descriptionData);
    }

    function describeBuilder(descriptionData) {
        const subContent = signet.isTypeOf('array')(descriptionData.children)
            ? descriptionData.children.map(buildSubContent).join('\n')
            : '<strong>No tests in this block.</strong>';

        const context = {
            description: descriptionData.description,
            content: subContent
        }

        return templates.describeItem(context);
    }

    function buildSubContent(descriptionData) {
        const contentBuilder = descriptionData.methodType === 'describe'
            ? describeBuilder
            : itBuilder;

        return contentBuilder(descriptionData);
    }

    function buildPage(descriptionData) {
        const subcontent = signet.isTypeOf('array')(descriptionData.children)
            ? descriptionData.children.map(buildSubContent).join('\n')
            : '';

        const context = {
            description: descriptionData.description,
            content: subcontent
        };

        return templates.describePage(context);
    }

    function descriptionToFileName(description) {
        const fileNameValue = description
            .replace(/\s/ig, '-')
            .replace(/\W/ig, '');

        return fileNameValue + '.html';
    }

    function buildTitleAsCore(descriptionTree) {
        const treeHasChildren = signet.isTypeOf('array')(descriptionTree.children)
            && descriptionTree.children.length > 0;

        const topLevelDescription = treeHasChildren
            ? descriptionTree.children[0].description
            : '';

        const content = treeHasChildren
            ? buildPage(descriptionTree)
            : '';

        const context = {
            content: content,
            fileRoot: '../'
        };

        return {
            fileDescription: topLevelDescription,
            fileName: descriptionToFileName(topLevelDescription),
            fileContent: templates.core(context)
        };
    }

    function htmlObjectToContext(htmlObject) {
        return {
            fileName: htmlObject.fileName,
            description: htmlObject.fileDescription
        }
    }

    function buildIndexHtml(htmlObjects) {
        const content = htmlObjects
            .map(htmlObjectToContext)
            .map((fileContext) => templates.describeLink(fileContext))
            .join('\n');

        return {
            fileDescription: '',
            fileName: 'index.html',
            fileContent: templates.core({ fileRoot: './', content: '<ul>\n' + content + '\n</ul>' })
        };
    }

    function buildHtml(titleData) {
        const htmlObjects = titleData.map(buildTitleAsCore);

        htmlObjects.push(buildIndexHtml(htmlObjects));

        return htmlObjects;
    }

    return {
        buildHtml: buildHtml
    };

}

module.exports = htmlBuilder;