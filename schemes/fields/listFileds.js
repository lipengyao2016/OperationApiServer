
var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,GraphQLInt,GraphQLInputObjectType} = require('graphql');
const _ = require('lodash');

function getListTypes(listName,elementType) {

    return new GraphQLObjectType({
        name: listName,
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
                    type: new GraphQLList(elementType),
                }

            },
    });
}

function getResourceTypes(resourceName,baseFields,extendFields) {
    const outputData = {};
    _.extend(outputData,baseFields, extendFields);
    return new GraphQLObjectType({
        name: resourceName,
        fields: outputData
    });
}

exports.getListTypes = getListTypes;
exports.getResourceTypes = getResourceTypes;