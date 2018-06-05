const _ = require('lodash');
const  userFileds= require('../fields/userFileds');
const  queryFileds= require('../fields/queryFileds');
var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,GraphQLInt,GraphQLInputObjectType} = require('graphql');

const  accountTypes= require('./accountTypes');
const  roleTypes= require('./roleTypes');

const  accountApi= require('../../controllers/interface/accountApi');
const  roleApi= require('../../controllers/interface/roleApi');

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
                type: GraphQLList(roleTypes.RoleType),
                resolve:  async (parentData,args,ctx,d)=>
                {
                    return await  roleApi.getRolesByUserRoles(parentData.userRoleMemberShips.href);
                }
            },
    };

const outputData = {};
_.extend(outputData,userFileds, extendFields);


const UserType = new GraphQLObjectType({
    name: 'user',
    fields:outputData,
});

const UserListType = new GraphQLObjectType({
    name: 'userList',
    fields:
        {
            size:{
                type: GraphQLInt,
            },
            offset:{
                type: GraphQLInt,
            },
            limit:{
                type: GraphQLInt,
            },
            items:{
                 type: new GraphQLList(UserType),
            }

        },
});




const queryData = {};
_.extend(queryData,userFileds, queryFileds);


const UserQueryType = new GraphQLInputObjectType({
    name: 'userQuery',
    fields: queryData,
});

exports.UserType = UserType;
exports.UserQueryType = UserQueryType;
exports.UserListType = UserListType;