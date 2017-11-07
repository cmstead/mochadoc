'use strict';

const handlebars = require('handlebars/runtime');
require('../../templates/templates');

const templates = handlebars.templates;

function htmlBuilder() {

    function itBuilder(descriptionData) {
        return templates.testItem(descriptionData);
    }

    function describeBuilder(descriptionData) {
        const subContent = typeof descriptionData.children !== 'undefined'
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
        const subcontent = descriptionData.children.map(buildSubContent).join('\n');

        const context = {
            description: descriptionData.description,
            content: subcontent
        };

        return templates.describePage(context);
    }

    function buildTitleAsCore(descriptionTree) {
        const treeHasChildren = descriptionTree.children.length > 0;
        const topLevelDescription = treeHasChildren
            ? descriptionTree.children[0].description
            : '';
        
        const content = treeHasChildren
            ? buildPage(descriptionTree)
            : '';

        const context = {
            content: content
        };

        return {
            fileDescription: topLevelDescription,
            fileContent: templates.core(context)
        };
    }

    function buildHtml(titleData) {
        return titleData.map(buildTitleAsCore);
    }

    return {
        buildHtml: buildHtml
    };

}

module.exports = htmlBuilder;