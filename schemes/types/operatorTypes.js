const _ = require('lodash');
const  operatorFileds= require('../fields/operatorFileds');
const  queryFileds= require('../fields/queryFileds');
const  listFileds= require('../fields/listFileds');


exports.OperatorType = listFileds.getResourceTypes('operator',operatorFileds,{});
exports.OperatorListType = listFileds.getListTypes('operatorList',exports.OperatorType);
exports.OperatorQueryType = queryFileds.getQueryType('operatorQuery',operatorFileds);
