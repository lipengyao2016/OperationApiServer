const _ = require('lodash');
const  accountFileds= require('../fields/accountFileds');
const  queryFileds= require('../fields/queryFileds');
const  listFileds= require('../fields/listFileds');


exports.AccountType = listFileds.getResourceTypes('account',accountFileds,{});
exports.AccountQueryType = queryFileds.getQueryType('accountQuery',accountFileds);