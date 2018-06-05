
const _ = require('lodash');

const request = require('common-request').request;
const devUtils = require('develop-utils');

const resourceURI = require('../resource/resourceURI');
const URIParser = resourceURI.v1;
const config = require('../../config/config');
const strUtils = require('../../common/strUtils');



exports.getUsers = async function (query,ctx) {

    let userHref = URIParser.baseResourcesURI(config.serverIndexs.User_Server,'users') ;

    let userRet = await request.get(userHref,query);

    return userRet.body.items.map(Item=>strUtils.convertHrefToUUID(Item));

}
