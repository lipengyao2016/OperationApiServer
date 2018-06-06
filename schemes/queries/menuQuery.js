var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,GraphQLInt,GraphQLInputObjectType} = require('graphql');


const  menuTypes  = require('../types/menuTypes');
const MenuListType = menuTypes.MenuListType;
const MenuQueryType = menuTypes.MenuQueryType;

const  menuApi  = require('../../controllers/interface/menuApi');



module.exports = {
    type: MenuListType,
    args: {
        options: {
            type: MenuQueryType,
        },
    },
    async resolve (root, {options = {}}, ctx) {

        if(!options.applicationHref)
        {
            options.applicationHref = ctx.jwt.applicationHref;
        }

        return await  menuApi.listMenus(options,ctx);
    }
}

