
const _ = require('lodash');

const request = require('common-request').request;
const devUtils = require('develop-utils');

const resourceURI = require('../resource/resourceURI');
const URIParser = resourceURI.v1;
const config = require('../../config/config');
const strUtils = require('../../common/strUtils');

const DataLoaderCache = require('../proxy/dataLoaderCache');

let roleLoader = new DataLoaderCache('roleDataLoader','user',listAllRoleByUser);

let roleUserCountLoader = new DataLoaderCache('roleUserCountLoader','role',listUserCountByRole,false);

exports.getRolesByUserRoles = async function (userRoleMemberShipsHref) {

  /*  let roleRet = await request.get(userRoleMemberShipsHref,{expand:'role'});
    return roleRet.body.items.map(Item=>strUtils.convertHrefToUUID(Item.role));*/

    let userUUID = devUtils.getLastResourceUUIDInURL(userRoleMemberShipsHref);
    return await  roleLoader.load(userUUID);
}

async function listAllRoleByUser(query,ctx) {

    let userRoleMemberShipHref = URIParser.baseResourcesURI(config.serverIndexs.User_Server,'userRoleMemberShips') + '/listAll' ;
    query.expand = 'role';
    let roleRet = await request.get(userRoleMemberShipHref,query);
    let roleData =  roleRet.body.items.map(Item=>{
        let roleData = strUtils.convertHrefToUUID(Item.role);
        roleData.user = {href:Item.user.href};
        return roleData;
    });

    return {
        items:roleData,
        size:roleData.length,
    };
}


exports.listRoles = async function (query,ctx) {

    let roleHref = URIParser.baseResourcesURI(config.serverIndexs.Role_Server,'roles') ;

    let roleRet = await request.get(roleHref,query);

     roleRet.body.items.map(Item=>strUtils.convertHrefToUUID(Item));
     return roleRet.body;
}

exports.getUserCountByRoleUUID = async function (roleUUID) {

/*    let userRoleMemberShipHref = URIParser.baseResourcesURI(config.serverIndexs.User_Server,'userRoleMemberShips') ;
    let roleRet = await request.get(userRoleMemberShipHref,{roleUUID:roleUUID,limit:0});
    return roleRet.body.size;*/

    let retData = await roleUserCountLoader.load(roleUUID);
    return (retData &&retData.count) ? retData.count : 0;

}

async function listUserCountByRole(query,ctx) {

    let userRoleMemberShipHref = URIParser.baseResourcesURI(config.serverIndexs.User_Server,'userRoleMemberShips') + '/listAll' ;
    let roleRet = await request.get(userRoleMemberShipHref,query);

    let roleData =  roleRet.body.items.map(Item=>{
        let roleHref = Item.role.href;
        let userHref = Item.user.href;
        return {href:roleHref,userHref:userHref};
    });

    let roleArrays = _.countBy(roleData,'href');
    let roleCounts =_.keys(roleArrays).map(key=>{
        return {
                 href:key,
                 count:roleArrays[key],
        };
    })


    return {
        items:roleCounts,
        size:roleData.length,
    };
}
