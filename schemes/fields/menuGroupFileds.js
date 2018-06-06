
var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,GraphQLInt,GraphQLInputObjectType} = require('graphql');

module.exports = {
    uuid:
        {
            type: GraphQLString
        },
    name:
        {
            type: GraphQLString
        },
    uiOrder:
        {
            type: GraphQLString
        },
     description:
        {
            type: GraphQLString
        },
     status:
        {
            type: GraphQLString
        },
     createdAt:{
        type: GraphQLString,
    },
     modifiedAt:{
        type: GraphQLString,
    },

};