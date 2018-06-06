var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,GraphQLInt,GraphQLInputObjectType} = require('graphql');


const  roleTypes  = require('../types/roleTypes');
const RoleListType = roleTypes.RoleListType;
const RoleQueryType = roleTypes.RoleQueryType;

const  roleApi  = require('../../controllers/interface/roleApi');



module.exports = {
    type: RoleListType,
    args: {
        options: {
            type: RoleQueryType,
        },
    },
    async resolve (root, {options= {}}, ctx) {


         if(!options.merchantHref)
         {
             options.merchantHref = ctx.jwt.merchantHref;
         }
        if(!options.applicationHref)
        {
            options.applicationHref = ctx.jwt.applicationHref;
        }

        return await  roleApi.listRoles(options,ctx);
    }
}

