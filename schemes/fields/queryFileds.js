
var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,GraphQLInt,GraphQLInputObjectType} = require('graphql');
const _ = require('lodash');


const queryFields = {
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

function getQueryType(queryName,baseFields) {

    const queryData = {};
    _.extend(queryData,queryFields, baseFields);
    return new GraphQLInputObjectType({
        name: queryName,
        fields: queryData,
    });
}

exports.getQueryType = getQueryType;