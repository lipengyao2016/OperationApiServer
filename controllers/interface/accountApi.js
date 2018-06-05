
const _ = require('lodash');

const request = require('common-request').request;
const devUtils = require('develop-utils');

const resourceURI = require('../resource/resourceURI');
const URIParser = resourceURI.v1;
const config = require('../../config/config');
const strUtils = require('../../common/strUtils');



exports.getAccountsByHref = async function (accountHref,ctx) {

    let accountRet = await request.get(accountHref);

    return strUtils.convertHrefToUUID(accountRet.body);

}
