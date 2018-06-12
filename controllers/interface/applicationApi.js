
const _ = require('lodash');

const request = require('common-request').request;
const devUtils = require('develop-utils');

const resourceURI = require('../resource/resourceURI');
const URIParser = resourceURI.v1;
const config = require('../../config/config');
const strUtils = require('../../common/strUtils');




exports.listApps = async function (query,ctx) {

    let applicationHref = URIParser.baseResourcesURI(config.serverIndexs.Account_Server,'applications') ;

    let applicationRet = await request.get(applicationHref,query);

    return applicationRet.body;
}