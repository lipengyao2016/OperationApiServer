
const _ = require('lodash');

const request = require('common-request').request;
const devUtils = require('develop-utils');

const resourceURI = require('../resource/resourceURI');
const URIParser = resourceURI.v1;
const config = require('../../config/config');
const strUtils = require('../../common/strUtils');

//const DataLoader = require('dataloader');


const DataLoaderCache = require('../proxy/dataLoaderCache');
let accountLoader = new DataLoaderCache('accountDataLoader',null,listAllAccounts,false);



exports.getAccountsByHref = async function (accountHref,ctx) {

  /*  let accountRet = await request.get(accountHref);
    return strUtils.convertHrefToUUID(accountRet.body);*/

  let accountUUID = devUtils.getLastResourceUUIDInURL(accountHref);

  return await accountLoader.load(accountUUID);
}


async function listAllAccounts(query,ctx) {

    let accountHref = URIParser.baseResourcesURI(config.serverIndexs.Account_Server,'accounts') + '/listAll' ;
    let accountRet = await request.get(accountHref,query);
    accountRet.body.items.map(Item=>strUtils.convertHrefToUUID(Item));
    return accountRet.body;

}