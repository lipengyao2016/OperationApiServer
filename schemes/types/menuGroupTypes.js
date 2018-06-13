const _ = require('lodash');
const  menuGroupFileds= require('../fields/menuGroupFileds');
const  queryFileds= require('../fields/queryFileds');
const  listFileds= require('../fields/listFileds');
const  menuApi  = require('../../controllers/interface/menuApi');
const   menuTypes  = require('./menuTypes');

const extendFields = {
    menus:
        {
            type: menuTypes.MenuListType,
            args: {
                options: {
                    type: menuTypes.MenuQueryType,
                },
            },
            resolve:  async (parentData,{options = {}},ctx,d)=>
            {
                return await  menuApi.getMenusByGroups(parentData.href,options);
            }
        },
};


exports.MenuGroupType = listFileds.getResourceTypes('menuGroup',menuGroupFileds,extendFields);
exports.MenuGroupListType = listFileds.getListTypes('menuGroupList',exports.MenuGroupType);
exports.MenuGroupQueryType = queryFileds.getQueryType('menuGroupQuery',menuGroupFileds);
