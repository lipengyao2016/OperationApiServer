
const _ = require('lodash');

const request = require('common-request').request;
const devUtils = require('develop-utils');

const resourceURI = require('../resource/resourceURI');
const URIParser = resourceURI.v1;
const config = require('../../config/config');
const strUtils = require('../../common/strUtils');
const DataLoaderCache = require('../proxy/dataLoaderCache');
let operatorLoader = new DataLoaderCache('operatorDataLoader','menu',listAllOperators);



exports.getOperatorsByMenus = async function (menuHref,query) {

   /* let operatorRet = await request.get(menuOperatorHref,query);

     operatorRet.body.items.map(Item=>strUtils.convertHrefToUUID(Item));
    return operatorRet.body;*/

    let menuUUID = devUtils.getLastResourceUUIDInURL(menuHref);
    query.menuUUID = menuUUID;

    return await operatorLoader.load(menuUUID);
}

async function listAllOperators(query,ctx) {

    let operatorHref = URIParser.baseResourcesURI(config.serverIndexs.Menu_Server,'operators') + '/listAll' ;
    let operatorRet = await request.get(operatorHref,query);
    operatorRet.body.items.map(Item=>strUtils.convertHrefToUUID(Item));
    return operatorRet.body;
}

