
var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,GraphQLInt,GraphQLInputObjectType} = require('graphql');

module.exports = {
    offset: {
        type: GraphQLInt,
    },
    limit: {
        type: GraphQLInt,
    },
    orderBy:{
        type: GraphQLString,
    },
    applicationHref:{
        type: GraphQLString,
    },
    merchantHref:{
        type: GraphQLString,
    },
};