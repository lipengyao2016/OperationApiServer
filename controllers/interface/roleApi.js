
const _ = require('lodash');

const request = require('common-request').request;
const devUtils = require('develop-utils');

const resourceURI = require('../resource/resourceURI');
const URIParser = resourceURI.v1;
const config = require('../../config/config');
const strUtils = require('../../common/strUtils');



exports.getRolesByUserRoles = async function (userRoleMemberShipsHref) {

    let roleRet = await request.get(userRoleMemberShipsHref,{expand:'role'});

    return roleRet.body.items.map(Item=>strUtils.convertHrefToUUID(Item.role));

}


exports.listRoles = async function (query,ctx) {

    let roleHref = URIParser.baseResourcesURI(config.serverIndexs.Role_Server,'roles') ;

    let roleRet = await request.get(roleHref,query);

     roleRet.body.items.map(Item=>strUtils.convertHrefToUUID(Item));
     return roleRet.body;

}

exports.getUserCountByRoleUUID = async function (roleUUID) {

    let userRoleMemberShipHref = URIParser.baseResourcesURI(config.serverIndexs.User_Server,'userRoleMemberShips') ;

    let roleRet = await request.get(userRoleMemberShipHref,{roleUUID:roleUUID,limit:0});

    return roleRet.body.size;

}