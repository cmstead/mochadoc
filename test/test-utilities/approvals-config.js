'use strict';

const approvalsConfigFactory = require('approvals-config-factory');

const approvalsPath = './test/approvals/';
const approvalsConfig = approvalsConfigFactory.buildApprovalsConfig({
    reporter: 'kdiff3'
});

require('approvals')
    .configure(approvalsConfig)
    .mocha(approvalsPath);