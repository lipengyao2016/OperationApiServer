
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
    type:
        {
            type: GraphQLString
        },
     description:
        {
            type: GraphQLString
        },
    number:
        {
            type: GraphQLString
        },
    menuId:
        {
            type: GraphQLString
        },
    iconHref:
        {
            type: GraphQLString
        },
    menuGroupUUID:
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