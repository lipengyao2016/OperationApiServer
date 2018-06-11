const _ = require('lodash');
const utils = require('componet-service-framework').utils;
const devUtils = require('develop-utils');

const qs = require('querystring');


//new RegExp('^/.*/menuGroups$'),

var ResourceUrlParamMapTable= {
    'menuGroups': {
        addParams: [
            {
                key: 'applicationHref',
                upKey: ''
            }
        ],
    },
    'menus': {
        addParams: [
            {
                key: 'applicationHref',
                upKey: ''
            }
        ],
    },
    'treeMenus': {
        addParams: [
            {
                key: 'applicationHref',
                upKey: ''
            }
        ],
    },
    'metaMenus': {
        addParams: [
            {
                key: 'applicationHref',
                upKey: ''
            }
        ],
    },

    'roles': {
        addParams: [
            {
                key: 'merchantHref',
                upKey: '',
                destKey:'ownerHref',
            }
        ],
    },
    'users': {
        addParams: [
            {
                key: 'merchantHref',
                upKey: '',
                destKey:'ownerHref',
            }
        ],
    },
    'roleDetails': {
        addParams: [
            {
                key: 'applicationHref',
                upKey: ''
            }
        ],
    },
    'registerUser': {
        addParams: [
            {
                key: 'applicationHref',
                upKey: 'user'
            },
            {
                key: 'merchantHref',
                upKey: 'user'
            },
            {
                key: 'applicationName',
                upKey: 'account'
            },
            {
                key: 'merchantNumber',
                upKey: 'account'
            },
        ],
    },

    'checkAccount': {
        addParams: [
            {
                key: 'merchantNumber',
                upKey: ''
            }
        ],
    },
};



class JwtFilter{
    constructor(){

    }

    addAttrIfNotExist(obj,params,srcData)
    {
        params.map(param=>{
            let upKey = param.upKey;
            let data = obj;
            if(!_.isEmpty(upKey))
            {
                data = obj[upKey];
            }

            let key = param.key;

            let destKey = param.destKey ? param.destKey : key;

           if(!data[destKey])
           {
               data[destKey] = srcData[key];
           }
        });
    }

    async filter(ctx){

        let url = ctx.url;

        let path = ctx.path;

        let bMatch = false;
        let addParams = [] ;

        let pathArrays = path.split('/');
        let action = '';
        if(pathArrays.length > 0)
        {
            action = pathArrays[pathArrays.length-1];
        }

        console.log('JwtFilter->filter  begin path:' + path + ',action:' + action);

/*        for(var key in ResourceUrlParamMapTable)
        {
            let resourceName = ResourceUrlParamMapTable[key].resourceName;
            let reqUrls =`^/.*!/${resourceName}$`;

            if(new RegExp(reqUrls).test(path))
            {
                bMatch = true;
                addParams = ResourceUrlParamMapTable[key].addParams;
                break;
            }
        }*/

        if(ResourceUrlParamMapTable[action])
        {
            bMatch = true;
            addParams = ResourceUrlParamMapTable[action].addParams;
        }

        if(bMatch)
        {
            if(ctx.method == 'POST' || ctx.method == 'PUT')
            {
                console.log(`jwt filter prev body:\n${JSON.stringify(ctx.request.body,null,2)}`);

                this.addAttrIfNotExist(ctx.request.body,addParams,ctx.jwt);
            }
            else if(ctx.method == 'GET')
            {
                console.log(`jwt filter prev query:\n${JSON.stringify(ctx.query,null,2)}`);

                this.addAttrIfNotExist(ctx.query,addParams,ctx.jwt);
            }
        }

        return true;
        

    }

}

let jwtFilter= new JwtFilter();
module.exports = jwtFilter;

