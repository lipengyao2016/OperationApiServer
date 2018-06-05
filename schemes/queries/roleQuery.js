var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,GraphQLInt,GraphQLInputObjectType} = require('graphql');


const  roleTypes  = require('../types/roleTypes');
const RoleType = roleTypes.RoleType;
const RoleQueryType = roleTypes.RoleQueryType;

const  roleApi  = require('../../controllers/interface/roleApi');



module.exports = {
    type: new GraphQLList(RoleType),
    args: {
        options: {
            type: RoleQueryType,
        },
    },
    async resolve (root, {options}, ctx) {
        return await  roleApi.listRoles(options,ctx);
    }
}

