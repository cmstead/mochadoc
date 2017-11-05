'use strict';

const estraverse = require('estraverse');
const signet = require('../signet-types');

function titlePicker() {

    const isArray = signet.isTypeOf('array');

    function getExpressionName(node) {
        return node.expression.callee.name;
    }

    function isFunctionCall(node) {
        return node.type === 'ExpressionStatement'
            && typeof node.expression.callee !== 'undefined'
    }

    function isTestMethodCall(node) {
        return isFunctionCall(node)
            && (getExpressionName(node) === 'describe'
                || getExpressionName(node) === 'it');
    }

    function isOnlyCall(node) {
        return isFunctionCall(node)
            && getExpressionName(node) === 'only';
    }

    function addChildArray(currentScope) {
        currentScope.children = isArray(currentScope.children)
            ? currentScope.children
            : [];
    }

    function pickTitles(resultData, fileAst) {

        let outputValues = {};
        let currentOutputObj = outputValues;

        estraverse.traverse(fileAst.sourceAst, {
            enter: function (node) {
                if(isOnlyCall(node)) {
                    throw new Error('Mochadoc cannot generate output if any tests are marked as "only."');
                }

                if (isTestMethodCall(node)) {
                    addChildArray(currentOutputObj);

                    const childScope = {
                        description: node.expression.arguments[0].value,
                        file: fileAst.filePath,
                        methodType: getExpressionName(node),
                        parent: currentOutputObj
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

    return {
        pickTitles: pickTitles
    };
}

module.exports = titlePicker;