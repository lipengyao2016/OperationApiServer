
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
    operatorId:
        {
            type: GraphQLString
        },
    uiOrder:
        {
            type: GraphQLString
        },
    menuUUID:
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