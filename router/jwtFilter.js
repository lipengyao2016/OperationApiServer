const _ = require('lodash');
const utils = require('componet-service-framework').utils;
const devUtils = require('develop-utils');

const qs = require('querystring');


//new RegExp('^/.*/menuGroups$'),

var ResourceUrlParamMapTable= [
    {
        addParams:[
            {
                key:'applicationHref',
                upKey:''
            }
            ],
        resourceName: 'menuGroups',
    },
    {
        addParams:[
            {
                key:'applicationHref',
                upKey:''
            }
                ],
        resourceName: 'menus',
    },
    {
        addParams:[
            {
                key:'applicationHref',
                upKey:''
            },
            {
                key:'merchantHref',
                upKey:''
            }
                ],
        resourceName: 'roles',
    },
    {
        addParams:[
            {
                key:'applicationHref',
                upKey:''
            },
            {
            key:'merchantHref',
             upKey:''
            }
        ],
        resourceName: 'users',
    },
    {
        addParams:[
            {
                key:'applicationHref',
                upKey:''
            }
            ],
        resourceName: 'roleDetails',
    },
    {
        addParams:[
            {
            key:'applicationHref',
            upKey:'user'
            },
            {
                key:'merchantHref',
                upKey:'user'
            },
            {
                key:'applicationName',
                upKey:'account'
            },
            {
                key:'merchantNumber',
                upKey:'account'
            },
        ],
        resourceName: 'registerUser',
    },
];



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

           if(!data[key])
           {
               data[key] = srcData[key];
           }
        });
    }

    async filter(ctx){

        console.log('JwtFilter->filter  begin :');

        let url = ctx.url;

        let path = ctx.path;

        let bMatch = false;
        let addParams = [] ;

/*        let pathArrays = path.split('/');
        let action = pathArrays[pathArrays.length-1];*/




        for(var key in ResourceUrlParamMapTable)
        {
            let resourceName = ResourceUrlParamMapTable[key].resourceName;
            let reqUrls =`^/.*/${resourceName}$`;

            if(new RegExp(reqUrls).test(path))
            {
                bMatch = true;
                addParams = ResourceUrlParamMapTable[key].addParams;
                break;
            }
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

