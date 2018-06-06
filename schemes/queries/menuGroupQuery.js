var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,GraphQLInt,GraphQLInputObjectType} = require('graphql');


const  menuGroupTypes  = require('../types/menuGroupTypes');
const MenuGroupListType = menuGroupTypes.MenuGroupListType;
const MenuGroupQueryType = menuGroupTypes.MenuGroupQueryType;

const  menuGroupApi  = require('../../controllers/interface/menuGroupApi');



module.exports = {
    type: MenuGroupListType,
    args: {
        options: {
            type: MenuGroupQueryType,
        },
    },
    async resolve (root, {options= {}}, ctx) {


        if(!options.applicationHref)
        {
            options.applicationHref = ctx.jwt.applicationHref;
        }

        return await  menuGroupApi.listMenuGroups(options,ctx);
    }
}

