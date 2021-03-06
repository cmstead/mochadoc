'use strict';

const estraverse = require('estraverse');
const signet = require('../signet-types');

function titlePicker(
    selectionBuilder) {

    const isArray = signet.isTypeOf('array');

    function getExpressionName(node) {
        let expressionName = node.expression.callee.name;

        if (typeof expressionName === 'undefined') {
            try {
                expressionName = node.expression.callee.property.name;
            } catch (e) {
                expressionName = '';
            }
        }

        return expressionName;
    }

    function isFunctionCall(node) {
        return signet.isTypeOf('object')(node.expression)
            && node.expression.type === 'CallExpression';
    }

    function isOnlyCall(node) {
        return isFunctionCall(node) && getExpressionName(node) === 'only';
    }

    function isSuiteCall(node) {
        return isFunctionCall(node)
            && (getExpressionName(node) === 'describe'
                || getExpressionName(node) === 'suite');
    }

    function isTestCall(node) {
        return isFunctionCall(node)
            && (getExpressionName(node) === 'it'
                || getExpressionName(node) === 'test');
    }

    const isTestMethodCall =
        (node) => {
            return isTestCall(node) || isSuiteCall(node);
        }

    function addChildArray(currentScope) {
        currentScope.children = isArray(currentScope.children)
            ? currentScope.children
            : [];
    }

    function getTestBody(node, fileAst) {
        const blockIsTestCall = isTestCall(node);
        const testBodyCoords = node.expression.arguments[1].loc;

        return blockIsTestCall
            ? selectionBuilder.buildSelection(testBodyCoords, fileAst.fileLines)
            : '';
    }

    function getDescriptionBlock(node, fileAst) {
        const testBodyCoords = node.expression.arguments[0].loc;

        return selectionBuilder.buildSelection(testBodyCoords, fileAst.fileLines);
    }

    function getTestDescription(node, fileAst) {
        return signet.isTypeOf('variant<string, object>')(node.expression.arguments[0].value)
            ? node.expression.arguments[0].value
            : getDescriptionBlock(node, fileAst);
    }

    function pickTitles(resultData, fileAst) {

        let outputValues = {};
        let currentOutputObj = outputValues;

        estraverse.traverse(fileAst.sourceAst, {
            enter: function (node) {
                if (isOnlyCall(node)) {
                    throw new Error('Mochadoc cannot generate output if any tests are marked as "only."');
                }

                if (isTestMethodCall(node)) {
                    addChildArray(currentOutputObj);

                    const childScope = {
                        description: getTestDescription(node, fileAst).toString(),
                        file: fileAst.filePath,
                        methodType: getExpressionName(node),
                        parent: currentOutputObj,
                        testBody: getTestBody(node, fileAst)
                    }

                    currentOutputObj.children.push(childScope);
                    currentOutputObj = childScope;
                }
            },
            leave: function (node) {
                if (isTestMethodCall(node)) {
                    const childObj = currentOutputObj;
                    currentOutputObj = childObj.parent;

                    childObj.parent = undefined;
                    delete childObj.parent;
                }
            }
        });

        resultData.push(outputValues);
        return resultData;
    }

    function pickAllTitles(fileAsts) {
        return fileAsts.reduce(pickTitles, []);
    }

    return {
        pickAllTitles: pickAllTitles,
        pickTitles: pickTitles
    };
}

module.exports = titlePicker;
