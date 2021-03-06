var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,GraphQLInt,GraphQLInputObjectType} = require('graphql');


const  userTypes  = require('../types/userTypes');
const UserListType = userTypes.UserListType;
const UserQueryType = userTypes.UserQueryType;

const  userApi  = require('../../controllers/interface/userApi');



module.exports = {
    type: UserListType,
    args: {
        options: {
            type: UserQueryType,
        },
    },
    async resolve (root, {options= {}}, ctx) {

        if(!options.ownerHref)
        {
            options.ownerHref = ctx.jwt.merchantHref;
        }

        return await  userApi.getUsers(options,ctx);
    }
}

