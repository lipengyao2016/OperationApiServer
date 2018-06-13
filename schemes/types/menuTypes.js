const _ = require('lodash');
const  menuFileds= require('../fields/menuFileds');
const  queryFileds= require('../fields/queryFileds');
const  operatorApi  = require('../../controllers/interface/operatorApi');
const   operatorTypes  = require('./operatorTypes');
const  listFileds= require('../fields/listFileds');

const extendFields = {
    operators:
        {
            type: operatorTypes.OperatorListType,
            args: {
                options: {
                    type: operatorTypes.OperatorQueryType,
                },
            },
            resolve:  async (parentData,{options = {}},ctx,d)=>
            {
                return await  operatorApi.getOperatorsByMenus(parentData.href,options);
            }
        },
};


exports.MenuType = listFileds.getResourceTypes('menu',menuFileds,extendFields);
exports.MenuListType = listFileds.getListTypes('menuList',exports.MenuType);
exports.MenuQueryType = queryFileds.getQueryType('menuQuery',menuFileds);
