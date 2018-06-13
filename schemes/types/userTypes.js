const _ = require('lodash');
const  userFileds= require('../fields/userFileds');
const  queryFileds= require('../fields/queryFileds');
const  listFileds= require('../fields/listFileds');
const  accountTypes= require('./accountTypes');
const  roleTypes= require('./roleTypes');
const  accountApi= require('../../controllers/interface/accountApi');
const  roleApi= require('../../controllers/interface/roleApi');
var {GraphQLList} = require('graphql');

const extendFields = {
        account:
            {
                type: accountTypes.AccountType,
                resolve:  async (parentData,args,ctx,d)=>
                {
                     return await  accountApi.getAccountsByHref(parentData.account.href);
                }
            },
        role:
            {
                type: roleTypes.RoleListType,
                resolve:  async (parentData,args,ctx,d)=>
                {
                    return await  roleApi.getRolesByUserRoles(/*parentData.userRoleMemberShips.href*/ parentData.href);
                }
            },
    };


exports.UserType = listFileds.getResourceTypes('user',userFileds,extendFields);
exports.UserListType = listFileds.getListTypes('userList',exports.UserType);
exports.UserQueryType = queryFileds.getQueryType('userQuery',userFileds);

