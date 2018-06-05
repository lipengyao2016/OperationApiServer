const { makeExecutableSchema } = require('graphql-tools');

const request = require('common-request').request;
const devUtils = require('develop-utils');

var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,GraphQLInt,GraphQLInputObjectType} = require('graphql');

function convertMenuDO(menuItem) {
    menuItem.upLevelMenuGroupUUID = devUtils.getResourceUUIDInURL(menuItem.upLevelMenuGroup.href,'menuGroups') ;
    menuItem.uuid = devUtils.getResourceUUIDInURL(menuItem.href,'menuGroups');
    return menuItem;
}


async function getMenuGroups(query,ctx) {

    let menuGroupUrl = 'http://localhost:6001/api/v1/menuGroups';

    let menuGroupRet = await request.get(menuGroupUrl,query);

    return menuGroupRet.body.items.map(menuGroupItem=>convertMenuDO(menuGroupItem));
}


async function addMenuGroups(data,ctx) {

    let menuGroupUrl = 'http://localhost:6001/api/v1/menuGroups';

    let menuGroupRet = await request.post(menuGroupUrl,data);

    return convertMenuDO(menuGroupRet.body);
}

async function updateMenuGroups(data,ctx) {

    let menuGroupUrl = `http://localhost:6001/api/v1/menuGroups/${data.uuid}`;

    delete data.uuid;

    let menuGroupRet = await request.post(menuGroupUrl,data);

    return convertMenuDO(menuGroupRet.body);
}


async function deleteMenuGroups(uuid,ctx) {

    let menuGroupUrl = `http://localhost:6001/api/v1/menuGroups/${uuid}`;

    let menuGroupObj = await request.get(menuGroupUrl);

    let menuGroupRet = await request.delete(menuGroupUrl);

    return convertMenuDO(menuGroupObj.body);
}

// The GraphQL schema in string form
/*const typeDefs = `
  type Query { menuGroups(uuid:String): [MenuGroup] }
  type MenuGroup { name: String, description: String,uiOrder: Int,status:String }
`;

// The resolvers
const resolvers = {
    Query: { menuGroups: async (root,{uuid},ctx,d)=> {
            return await  getMenuGroups(uuid,ctx);
        } },

};

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});*/



const menuGroupType = new GraphQLObjectType({
    name: 'MenuGroup',
    fields: () => ({
        uuid: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        uiOrder: {
            type: GraphQLInt,
           // resolve: async (books) => await getMerchants(books),
        },
        status:{
            type: GraphQLString,
        },
        createdAt:{
            type: GraphQLString,
        },
        modifiedAt:{
            type: GraphQLString,
        },
        upLevelMenuGroupUUID:{
            type: GraphQLString,
        },
    }),
});

const menuGroupInputType = new GraphQLInputObjectType({
    name: 'menuGroupInputType',
    fields: {
        uuid: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        uiOrder: {
            type: GraphQLInt,
        },
        status:{
            type: GraphQLString,
        },
        applicationHref:{
            type: GraphQLString,
        },
        menuOrganizationHref:{
            type: GraphQLString,
        },
        upLevelMenuGroupHref:{
            type: GraphQLString,
        },

    }
});

const menuGroupQueryType = new GraphQLInputObjectType({
    name: 'menuGroupQueryType',
    fields: {
        uuid: {
            type: GraphQLList(GraphQLString)
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        uiOrder: {
            type: GraphQLInt,
        },
        status:{
            type: GraphQLList(GraphQLString),
        },
        applicationHref:{
            type: GraphQLString,
        },
        menuOrganizationUUID:{
            type: GraphQLList(GraphQLString),
        },
        createdAt:{
            type: GraphQLString,
        },
        modifiedAt:{
            type: GraphQLString,
        },
        upLevelMenuGroupUUID:{
            type: GraphQLList(GraphQLString),
        },
        offset: {
            type: GraphQLInt,
        },
        limit: {
            type: GraphQLInt,
        },
        orderBy:{
            type: GraphQLString,
        },
    }
});





const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        menuGroups: {
            type: GraphQLList(menuGroupType),
            args: {
                options: {
                    type: menuGroupQueryType,
                },
            },
            resolve: async (root, params,ctx) => await getMenuGroups(params.options,ctx),
        },
    }),
});


const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        add: {
            type: menuGroupType,
            args: {
                info: {
                    description: '',
                    type: menuGroupInputType,
                },
            },
            resolve: async (root, params,ctx) => await addMenuGroups(params.info,ctx),
        },

        update: {
            type: menuGroupType,
            args: {
                options: {
                    description: '',
                    type: menuGroupInputType,
                },
            },
            resolve: async (root, params,ctx) => await updateMenuGroups(params.options,ctx),
        },

        delete: {
            type: menuGroupType,
            args: {
                uuid: {
                    description: '',
                    type: GraphQLString,
                },
            },
            resolve: async (root, params,ctx) => await deleteMenuGroups(params.uuid,ctx),
        },

    }),
});


const schema = new GraphQLSchema({
    query: queryType,
    mutation:mutationType,
});





module.exports = schema;