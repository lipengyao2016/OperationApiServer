const _ = require('lodash');
const  roleFileds= require('../fields/roleFileds');
const  queryFileds= require('../fields/queryFileds');
var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,GraphQLInt,GraphQLInputObjectType} = require('graphql');


const  roleApi  = require('../../controllers/interface/roleApi');

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

const outputData = {};
_.extend(outputData,roleFileds, extendFields);
exports.RoleType = new GraphQLObjectType({
    name: 'role',
    fields: outputData
});



const queryData = {};
_.extend(queryData,roleFileds, queryFileds);
exports.RoleQueryType = new GraphQLInputObjectType({
    name: 'roleQuery',
    fields: queryData,
});