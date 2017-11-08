'use strict';

const signet = require('../signet-types');

function dataConsolidator() {

    const matchesDescription =
        (descriptionRecord) =>
            (existingRecord) =>
                existingRecord.description === descriptionRecord.description
                && existingRecord.methodType === descriptionRecord.methodType;

    function mergeRecord(consolidatedData, descriptionRecord) {
        const existingRecord = consolidatedData.find(matchesDescription(descriptionRecord));

        if(!existingRecord || !existingRecord.children) {
            consolidatedData.push(descriptionRecord);
        } else {
            existingRecord.children = existingRecord.children.concat(descriptionRecord.children);
        }

        return consolidatedData
    }

    function mergeChildData(consolidatedData, childRecord) {
        return signet.isTypeOf('array')(childRecord.children)
            ? childRecord.children.reduce(mergeRecord, consolidatedData)
            : consolidatedData;
    }

    function consolidateDescriptionData(descriptionData) {
        return descriptionData.reduce(mergeChildData, []);
    }

    return {
        consolidateDescriptionData: consolidateDescriptionData
    };
}

module.exports = dataConsolidator;