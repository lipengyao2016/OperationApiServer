var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,GraphQLInt,GraphQLInputObjectType} = require('graphql');


const  userTypes  = require('../types/userTypes');
const UserType = userTypes.UserType;
const UserQueryType = userTypes.UserQueryType;

const  userApi  = require('../../controllers/interface/userApi');



module.exports = {
    type: new GraphQLList(UserType),
    args: {
        options: {
            type: UserQueryType,
        },
    },
    async resolve (root, {options}, ctx) {
        return await  userApi.getUsers(options,ctx);
    }
}

