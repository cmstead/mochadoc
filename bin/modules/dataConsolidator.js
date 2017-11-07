'use strict';

function dataConsolidator() {

    const matchesDescription =
        (descriptionRecord) =>
            (existingRecord) =>
                existingRecord.description === descriptionRecord.description
                && existingRecord.methodType === descriptionRecord.methodType;

    function mergeRecord(consolidatedData, descriptionRecord) {
        const existingRecord = consolidatedData.find(matchesDescription(descriptionRecord));

        if(typeof existingRecord === 'undefined') {
            consolidatedData.push(descriptionRecord);
        } else {
            existingRecord.children = existingRecord.children.concat(descriptionRecord.children);
        }

        return consolidatedData
    }

    function mergeChildData(consolidatedData, childRecord) {
        return childRecord.children.reduce(mergeRecord, consolidatedData);
    }

    function consolidateDescriptionData(descriptionData) {
        return descriptionData.reduce(mergeChildData, []);
    }

    return {
        consolidateDescriptionData: consolidateDescriptionData
    };
}

module.exports = dataConsolidator;