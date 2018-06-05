var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,GraphQLInt,GraphQLInputObjectType} = require('graphql');

const queries = require('./queries/index');

let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: queries
    }),
});

module.exports = schema;