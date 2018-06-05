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
const RoleType = new GraphQLObjectType({
    name: 'role',
    fields: outputData
});


const RoleListType = new GraphQLObjectType({
    name: 'roleList',
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
                type: new GraphQLList(RoleType),
            }

        },
});



const queryData = {};
_.extend(queryData,roleFileds, queryFileds);
const RoleQueryType = new GraphQLInputObjectType({
    name: 'roleQuery',
    fields: queryData,
});

exports.RoleType = RoleType;
exports.RoleListType = RoleListType;
exports.RoleQueryType = RoleQueryType;