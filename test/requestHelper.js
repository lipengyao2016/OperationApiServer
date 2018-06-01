const request = require('common-request').request;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const utils = require('componet-service-framework').utils;
const  loginToken= require('./loginToken');


class RequestHelper
{
    get(url,qs={},options){

        return Promise.resolve('start').then(data=>{
            if(_.isEmpty(options))
            {
                return loginToken.getOptions();
            }
            else
            {
                return options;
            }
        }).then(option=>{

            return request.get(url,qs,option);
        })


    }
    post(url,data={},options){

        return Promise.resolve('start').then(data=>{
            if(_.isEmpty(options))
            {
                return loginToken.getOptions();
            }
            else
            {
                return options;
            }
        }).then(option=>{

            return request.post(url,data,option);
        })

    }
    put(url,data={},options){

        return Promise.resolve('start').then(data=>{
            if(_.isEmpty(options))
            {
                return loginToken.getOptions();
            }
            else
            {
                return options;
            }
        }).then(option=>{

            return request.put(url,data,option);
        })

    }
    delete(url,qs={},options){

        return Promise.resolve('start').then(data=>{
            if(_.isEmpty(options))
            {
                return loginToken.getOptions();
            }
            else
            {
                return options;
            }
        }).then(option=>{

            return request.delete(url,qs,option);
        })

    }

}

let requestHelper = new RequestHelper();
exports.requestHelper = requestHelper;