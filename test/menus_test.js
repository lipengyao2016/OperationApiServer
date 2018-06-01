/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const  requestHelper= require('./requestHelper').requestHelper;
const devUtils = require('develop-utils');
let options = {};




describe('menus Test Case:',()=>{
    let menusTestCase =
        {
        name: '插件管理qq',
        menuId: '64D05948-36AD-41A0-AF78-75FA23D657C1',
        uiOrder:4,
        // menuGroupHref:'http://localhost:6001/api/v1.0.0/menuGroups/6cVizWBnkIRlGHCttOmspg',

        // applicationHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA',

         operators:[
             {
                 name: '插件列表qq',
                 operatorId:'6129CC59-116C-4DD5-9BB2-74A83712F86A2',
             },
             {
                 name: '新增插件qq',
                 operatorId:'6a7da35f-d2fa-4b6c-9abc-4703db60ea3f3',
             },
         ],
    };


    let applicationUUID = 'AppUUIDForTestCase';
    let menusUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url + '/menuServer/api/v1' ;

    //menusUUID = 'SAVkeDwGSBpGRTwOWRLDLQ';

    describe('create test case:',  ()=>{
        it('success create an menus',  ()=> {
            //this.timeout(0);

            return requestHelper.post(`${tenantURL}/menus`,menusTestCase,options).then( ( {statusCode, body, headers, requestHelper} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');

                menusUUID = devUtils.getLastResourceUUIDInURL(body.href);

                console.log('menus test  create  menusUUID  :' + menusUUID + ' body:'+JSON.stringify(body,null,2));
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an menus  ', function () {
            //this.timeout(0);

            return requestHelper.get(`${tenantURL}/menus/${menusUUID}`,{}).then( ( { statusCode,body,headers,requestHelper} )=>{

                console.log('menus test retrieve   :' + JSON.stringify(body));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(menusTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an menus', function () {
            //this.timeout(0);
           // menusUUID = '7O1PwyXNuUOEXxvRfvbyrQ';
            let updateInfo = {};
            updateInfo.number = '05';
            return requestHelper.post(`${tenantURL}/menus/${menusUUID}`,updateInfo).then( ( { statusCode,body,headers,requestHelper} )=>{

                console.log('menus test update   :' + JSON.stringify(body));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });
    describe('list test case:', function () {


        it('list menus  ', function () {
            //this.timeout(0);
            let qs = {
                name:'*插件*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
                //menusPackageUUID:'xAdNYJaUdyyXyFmd1rFkUg',
               // orderBy:'uiOrder DESC',

            };
            return requestHelper.get(`${tenantURL}/menus`,qs,options).then( ( { statusCode,body,headers,requestHelper} )=>{

                console.log('menus test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });


        it('list treeMenus  ', function () {
            //this.timeout(0);
            let qs = {
              //  applicationHref:'http://localhost:5000/api/v1.0.0/applications/BQZNqVpEbFxyZ7ayW7x2yA',
             //   menuOrganizationHref : 'http://localhost:6001/api/v1.0.0/menuOrganizations/rIdUW07jGttn5VNGcPvnuQ',
            };
            return requestHelper.get(`${tenantURL}/treeMenus`,qs,options).then( ( { statusCode,body,headers,requestHelper} )=>{

                console.log('menus test treeMenus   :' + JSON.stringify(body));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });



    });

    describe('delete test case:',()=>{
        it('success delete an menus', function () {
            //this.timeout(0);

            return requestHelper.delete(`${tenantURL}/menus/${menusUUID}`).then( ( { statusCode,body,headers,requestHelper} )=>{
                expect(statusCode).to.equal(204);
            });
        });
    });
});