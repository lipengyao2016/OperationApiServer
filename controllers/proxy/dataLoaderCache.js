
const _ = require('lodash');
const request = require('common-request').request;
const devUtils = require('develop-utils');
const DataLoader = require('dataloader');

class DataLoaderCache{
    constructor(dataLoaderName,keyName,queryFunc,bList = true,bCache = false){
        this.keyName = keyName;
        this.queryFunc = queryFunc;
        this.dataLoaderName = dataLoaderName;

        let keyUUID = this.keyUUID = keyName ?  `${keyName}UUID` : 'uuid';

        let ctx = this;

        this.dataLoader = new DataLoader(keys => {
            
            console.log(`call DataLoaderCache [${dataLoaderName}]  start  keys:` + JSON.stringify(keys,null,2));

            let query = {};
            let keyUUIDArrays = [];
            keys.map(tempkey=>{
               if(keyUUIDArrays.indexOf(tempkey) < 0)
               {
                   keyUUIDArrays.push(tempkey);
               }
            });
            query[keyUUID] = keyUUIDArrays;

            console.log(`call DataLoaderCache [${dataLoaderName}] filter  keyUUIDArrays:` + JSON.stringify(keyUUIDArrays,null,2));
            
            return queryFunc.call(null,query).then(data=>{

                let dataItems = data.items;
                dataItems.map(dataItem=>{
                  dataItem[keyUUID] = devUtils.getLastResourceUUIDInURL(dataItem[keyName] ?  dataItem[keyName].href : dataItem.href);

                });
                let dataItemByGroups = _.groupBy(dataItems,keyUUID);

                let dataReq = keys.map(key=>
                {
                    if(bList)
                    {
                        return {
                            size:dataItemByGroups[key] ?dataItemByGroups[key].length : 0,
                            offset: 0,
                            limit: 0,
                            items:dataItemByGroups[key] ?dataItemByGroups[key] : [],
                        };
                    }
                    else
                    {
                        return dataItemByGroups[key] ? dataItemByGroups[key][0] : {};
                    }
                });
                //console.log(`call DataLoaderCache [${dataLoaderName}] end dataReq:` + JSON.stringify(dataReq,null,2));
                console.log(`call DataLoaderCache [${dataLoaderName}] end keys:` + JSON.stringify(keys,null,2));
                return dataReq;
            });

        }, { cache: bCache });

    }

    load(key)
    {
        return this.dataLoader.load(key);
    }

}


module.exports = DataLoaderCache;