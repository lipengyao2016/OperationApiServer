/**
 * Copyright(C),
 * FileName:  uri.js
 * Author: sxt
 * Version: 1.0.0
 * Date: 2015/10/13  15:29
 * Description:
 */

"use strict";
const domain = require('../../common/domain');
const config = require('../../config/config');

let host = '';
if (config.is_https){
    host = 'https://'+ domain.getDomainName() +'/api/v1.0.0';
}else{
    host = 'http://'+ domain.getDomainName() +'/api/v1.0.0';
}
const httpType= config.is_https?'https':'http';
const domainName = domain.getDomainName();

class ResourceURI{
    constructor(version='v1.0.0',host=domainName,schemes=httpType) {
        this.version = version;
        this.schemes = schemes;
        this.host = `${this.schemes}://${domainName}`;
        this.api = `${this.schemes}://${domainName}/api/${this.version}`;
        this.apiPath =  `/api/${this.version}`;
    };

    getHost()
    {
        return this.host;
    }

    externServersURI(externalURL,serverHost,key)
    {
        if(externalURL)
        {
            return (`${externalURL}/${key}`);
        }
        else
            {
            return (`${serverHost}${this.apiPath}/${key}`);
        }
    }



    baseResourcesURI(busiServerHostIdx,resourceName)
    {
        let serverName = config.ThirdServerByCommonConfig[busiServerHostIdx];
        let busiServerHost = `http://${config[serverName].host}:${config[serverName].port}`;
        return this.externServersURI(null,busiServerHost,resourceName);
    }



}

exports.v1 = new ResourceURI('v1.0.0');
exports.ResourceURI = ResourceURI;