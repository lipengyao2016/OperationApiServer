/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const request = require('common-request').request;
const  requestHelper= require('./requestHelper').requestHelper;
const devUtils = require('develop-utils');
let options = {};

describe('menuGroup Test Case:',()=>{
    let menuGroupTestCase = {
        name: '测试管理pp',
        description: 'datagg',
        uiOrder: 3,
      //  upLevelMenuGroupHref:'http://localhost:6001/api/v1.0.0/menuGroups/eTUA8Knx9e0OMumDevYQ7g',
      //  menuOrganizationHref: 'http://localhost:6001/api/v1.0.0/menuOrganizations/PMM7M1sFnSTlDalZXqvPmQ',
       // applicationHref:'http://localhost:5000/api/v1.0.0/applications/BQZNqVpEbFxyZ7ayW7x2yA',
    };
    let applicationUUID = 'AppUUIDForTestCase';
    let menuGroupUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url + '/menuServer/api/v1' ;

    //menuGroupUUID = '2U8mjPmujryXeCzFe8e22Q';

    describe('create test case:',  ()=>{
        it('success create an menuGroup',  ()=> {
            //this.timeout(0);

                return requestHelper.post(`${tenantURL}/menuGroups`,menuGroupTestCase,options).then( ( {statusCode, body, headers, request} )=>{
                    expect(statusCode).to.equal(201);
                    expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                    console.log('menuGroups test  create   body:'+JSON.stringify(body,null,2));

                    menuGroupUUID = devUtils.getLastResourceUUIDInURL(body.href);

                    console.log('menuGroups test  create   menuGroupUUID:'+menuGroupUUID);
                });



        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an menuGroup  ', function () {
            //this.timeout(0);

            return requestHelper.get(`${tenantURL}/menuGroups/${menuGroupUUID}`,{},options).then( ( { statusCode,body,headers,request} )=>{

                console.log('menuGroups test retrieve   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(menuGroupTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an menuGroup', function () {
            //this.timeout(0);
           // menuGroupUUID = '7O1PwyXNuUOEXxvRfvbyrQ';
            let updateInfo = {};
            //menuGroupUUID = 'ZPkd6sThTsgNq8M3WzPQnQ';
            updateInfo.description = 'single';
            return requestHelper.post(`${tenantURL}/menuGroups/${menuGroupUUID}`,updateInfo,options).then( ( { statusCode,body,headers,request} )=>{

                console.log('menuGroups test update   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });
    describe('list test case:', function () {


        it('list menuGroups  ', function () {
            //this.timeout(0);
            let qs = {
                name:'*测试管理*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
              //  applicationHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA',
            };
            return requestHelper.get(`${tenantURL}/menuGroups`,qs,options).then( ( { statusCode,body,headers,request} )=>{

                console.log('menuGroups test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });




    });

    describe('delete test case:',()=>{
        it('success delete an menuGroup', function () {
            //this.timeout(0);

            return requestHelper.delete(`${tenantURL}/menuGroups/${menuGroupUUID}`).then( ( { statusCode,body,headers,request} )=>{
                expect(statusCode).to.equal(204);
            });
        });
    });
});