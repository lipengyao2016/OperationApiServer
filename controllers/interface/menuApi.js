
const _ = require('lodash');

const request = require('common-request').request;
const devUtils = require('develop-utils');

const resourceURI = require('../resource/resourceURI');
const URIParser = resourceURI.v1;
const config = require('../../config/config');
const strUtils = require('../../common/strUtils');

const DataLoaderCache = require('../proxy/dataLoaderCache');

let menuLoader = new DataLoaderCache('menuDataLoader','menuGroup',listAllMenus);



exports.getMenusByGroups = async function (menuGroupHref,query) {

    let menuGroupUUID = devUtils.getLastResourceUUIDInURL(menuGroupHref);
    query.menuGroupUUID = menuGroupUUID;

    return await menuLoader.load(menuGroupUUID);

/*    let menuRet = await request.get(menuGroupHref,query);
    menuRet.body.items.map(Item=>strUtils.convertHrefToUUID(Item));
    return menuRet.body;*/
}


async function listAllMenus(query,ctx) {

    let menuHref = URIParser.baseResourcesURI(config.serverIndexs.Menu_Server,'menus') + '/listAll' ;
    let menuRet = await request.get(menuHref,query);
    menuRet.body.items.map(Item=>strUtils.convertHrefToUUID(Item));
    return menuRet.body;
}

exports.listMenus = async function (query,ctx) {

    let menuHref = URIParser.baseResourcesURI(config.serverIndexs.Menu_Server,'menus') ;
    let menuRet = await request.get(menuHref,query);
    menuRet.body.items.map(Item=>strUtils.convertHrefToUUID(Item));
    return menuRet.body;
}