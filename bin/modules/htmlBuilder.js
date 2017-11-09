'use strict';

const signet = require('../signet-types');
const handlebars = require('handlebars/runtime');
require('../../templates/templates');

const templates = handlebars.templates;

function htmlBuilder(config) {

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
        const cleanDescription = signet.isTypeOf('string')(description)
            ? description
            : 'No description';

        const fileNameValue = cleanDescription
            .replace(/\s/ig, '-')
            .replace(/\W/ig, '');

        return fileNameValue + '.html';
    }

    function getProjectName () {
        return typeof config.projectName !== 'undefined'
            ? config.projectName
            : 'Project name not specified';
    }

    function buildTitleAsCore(descriptionTree) {
        const treeHasChildren = signet.isTypeOf('array')(descriptionTree.children)
            && descriptionTree.children.length > 0;

        const topLevelDescription = descriptionTree.description;

        const content = treeHasChildren
            ? buildPage(descriptionTree)
            : '';

        const context = {
            content: content,
            projectName: getProjectName(),            
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

    function compareContextObjects(obj1, obj2) {
        const initialResult = obj1.fileName < obj2.fileName ? -1 : 0;
        return obj1.fileName > obj2.fileName ? 1 : initialResult;
    }

    function buildIndexHtml(htmlObjects) {
        const content = htmlObjects
            .map(htmlObjectToContext)
            .sort(compareContextObjects)
            .map((fileContext) => templates.describeLink(fileContext))
            .join('\n');

        const indexContext = {
            fileRoot: './',
            projectName: getProjectName(),
            content: '<h1>' + getProjectName() + '</h1>' +
            '<ul>\n' + content + '\n</ul>'
        };

        return {
            fileDescription: '',
            fileName: 'index.html',
            fileContent: templates.core(indexContext)
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