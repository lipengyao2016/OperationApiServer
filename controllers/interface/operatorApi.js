
const _ = require('lodash');

const request = require('common-request').request;
const devUtils = require('develop-utils');

const resourceURI = require('../resource/resourceURI');
const URIParser = resourceURI.v1;
const config = require('../../config/config');
const strUtils = require('../../common/strUtils');



exports.getOperatorsByMenus = async function (menuOperatorHref,query) {

    let operatorRet = await request.get(menuOperatorHref,query);

     operatorRet.body.items.map(Item=>strUtils.convertHrefToUUID(Item));
    return operatorRet.body;
}
