const { makeExecutableSchema } = require('graphql-tools');

const request = require('common-request').request;
const devUtils = require('develop-utils');

const resourceURI = require('../controllers/resource/resourceURI');
const URIParser = resourceURI.v1;
const config = require('../config/config');

var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,GraphQLInt,GraphQLInputObjectType} = require('graphql');


function convertHrefToUUID(Item) {

    Item.uuid = devUtils.getLastResourceUUIDInURL(Item.href);
    return Item;
}

async function getUsers(query,ctx) {

    let userHref = URIParser.baseResourcesURI(config.serverIndexs.User_Server,'users') ;

    let userRet = await request.get(userHref,query);

    return userRet.body.items.map(Item=>convertHrefToUUID(Item));

}

async function getAccounts(parentData,ctx) {

    //let accountHref = URIParser.baseResourcesURI(config.serverIndexs.Account_Server,'accounts') ;

    let accountRet = await request.get(parentData.account.href);

    return convertHrefToUUID(accountRet.body);

}


async function getRoles(parentData,ctx) {

    //let accountHref = URIParser.baseResourcesURI(config.serverIndexs.Account_Server,'accounts') ;

    let roleRet = await request.get(parentData.userRoleMemberShips.href,{expand:'role'});

    return roleRet.body.items.map(Item=>convertHrefToUUID(Item.role));

}

// The GraphQL schema in string form
const typeDefs = `
  type Query 
  { 
  users(options:UserQuery): [User] 
  }
  type User { 
  uuid: String,name: String, description: String,email: String,
  sex:String,mobile: String,address:String,
  type: String,headImgHref:String, status: String,account:Account,role:[Role]
  }
  input  UserQuery { 
  uuid: String,name: String, description: String,email: String,
  sex:String,mobile: String,address:String, 
  type: String,headImgHref:String, status: String,
  createdAt: String,modifiedAt: String,
  orderBy: String, offset:  Int,limit:  Int,
  }
   type Account { 
  uuid: String,name: String, merchantNumber: String,number: String,
  mobile: String,email:String,
  description: String,status: String
  }
  type Role { 
  uuid: String,name: String, description: String,type: String,
  status: String
  }
`;

// The resolvers
const resolvers = {
    Query: { users: async (root,{options},ctx,d)=> {
            return await  getUsers(options,ctx);
        } },
    User:{
        account:async (parentData,args,ctx,d)=> {
            return await  getAccounts(parentData,ctx);
        },
        role:async (parentData,args,ctx,d)=> {
            return await  getRoles(parentData,ctx);
        }
    }

};

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});













module.exports = schema;