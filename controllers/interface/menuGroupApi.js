
const _ = require('lodash');

const request = require('common-request').request;
const devUtils = require('develop-utils');

const resourceURI = require('../resource/resourceURI');
const URIParser = resourceURI.v1;
const config = require('../../config/config');
const strUtils = require('../../common/strUtils');



exports.listMenuGroups = async function (query,ctx) {

    let menuGroupHref = URIParser.baseResourcesURI(config.serverIndexs.Menu_Server,'menuGroups') ;

    let menuRet = await request.get(menuGroupHref,query);

     menuRet.body.items.map(Item=>strUtils.convertHrefToUUID(Item));

     return menuRet.body;

}
