const _ = require('lodash');
const  accountFileds= require('../fields/accountFileds');
const  queryFileds= require('../fields/queryFileds');
var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,GraphQLInt,GraphQLInputObjectType} = require('graphql');


exports.AccountType = new GraphQLObjectType({
    name: 'account',
    fields: accountFileds
});

const data = _.extend(accountFileds, queryFileds);


exports.AccountQueryType = new GraphQLInputObjectType({
    name: 'accountQuery',
    fields: data,
});