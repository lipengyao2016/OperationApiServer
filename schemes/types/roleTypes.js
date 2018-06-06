const _ = require('lodash');
const  roleFileds= require('../fields/roleFileds');
const  queryFileds= require('../fields/queryFileds');
const  listFileds= require('../fields/listFileds');
const  roleApi  = require('../../controllers/interface/roleApi');
var { GraphQLInt} = require('graphql');


const extendFields = {
    userCount:
        {
            type:GraphQLInt,
            resolve:  async (parentData,args,ctx,d)=>
            {
                return await  roleApi.getUserCountByRoleUUID(parentData.uuid);
            }
        },
};


exports.RoleType = listFileds.getResourceTypes('role',roleFileds,extendFields);
exports.RoleListType = listFileds.getListTypes('roleList',exports.RoleType);
exports.RoleQueryType = queryFileds.getQueryType('roleQuery',roleFileds);
