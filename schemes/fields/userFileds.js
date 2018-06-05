
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
    description:
        {
            type: GraphQLString
        },
    email:
        {
            type: GraphQLString
        },
    sex:
        {
            type: GraphQLString
        },
    mobile:
        {
            type: GraphQLString
        },
    address:
        {
            type: GraphQLString
        },
    type:
        {
            type: GraphQLString
        },
    headImgHref:
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