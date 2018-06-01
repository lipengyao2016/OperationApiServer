const request = require('common-request').request;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const utils = require('componet-service-framework').utils;

async function  getToken()
{
    let  body = {
        "applicationName": "LaiKoo-Platform",     // 系统名称, 莱客平台：'LaiKoo-Platform',
        // 莱客管家：'LaiKoo-Butler',莱客收银：'LaiKoo-CashRegister'
        "merchantNumber": "900001",    // 商户编号
        "key": "liuzong",                 // 账户名、账号、手机号
        "value": new Buffer("888888").toString('base64')
    };

    let loginRet = await request.post('http://192.168.7.26:6100/api/v1.0.0/login',body);

    return loginRet.body.token;
}

async function getOptions() {
    let token = await  getToken();
    let header =
        {
            "authorization": `Bearer ${token}`,
        };

    let options = {
        headers: header,
    };

    return options;

}

exports.getOptions = getOptions;