/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const request = require('common-request').request;

let header =
    {
        "authorization": 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InV1aWQiOiJXdDRjMVZ4alJNQ3lHakhGdk5yZlhRIiwibmFtZSI6ImxpdXpvbmcifSwibWVyY2hhbnQiOnsidXVpZCI6IjBCbEFRaTNCWEFFRUV1cmhZa1ZjZ0EiLCJuYW1lIjoi5bmz5Y-w5byA5Y-R5ZWGIiwibnVtYmVyIjoiOTAwMDAxIn0sImFwcGxpY2F0aW9uIjp7InV1aWQiOiJTYWQ5WUhEWGhtOWN5TWVvTnZyMmlnIiwibmFtZSI6IkxhaUtvby1QbGF0Zm9ybSJ9LCJyb2xlcyI6W3sidXVpZCI6ImNySXVaOEFjVUhCZEpBeFZWU2xISFEifV0sImlhdCI6MTUyNzc5Nzg1NiwiZXhwIjoxNTI3ODQxMDU2fQ.aeyGMGQCwjSHpbV6L_-iQkqJ-vENnjNVTppaV4FieRV5bs_sSeqWh0Q7CGe-P8NFdAHQDzAcCxEbQ2Pw9PMWdyBSlM2omkiB-OJXoHGEIE0Ljkq4hzuArIAYvKVtFw-HjTlhpNrsofzulMa3M9xamrAkkhcqLImwhY44eaLTHr0',
    };

let options = {
    headers: header,
};


describe('menus Test Case:',()=>{
    let menusTestCase =
        {
        name: '插件管理',
        menuId: '64D05948-36AD-41A0-AF78-75FA23D657C5',
        uiOrder:4,
        // menuGroupHref:'http://localhost:6001/api/v1.0.0/menuGroups/6cVizWBnkIRlGHCttOmspg',

        // applicationHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA',

         operators:[
             {
                 name: '插件列表',
                 operatorId:'6129CC59-116C-4DD5-9BB2-74A83712F86A',
             },
             {
                 name: '新增插件',
                 operatorId:'6a7da35f-d2fa-4b6c-9abc-4703db60ea3f',
             },
         ],
    };


    let applicationUUID = 'AppUUIDForTestCase';
    let menusUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url /*+ '/directories' + '/zbDG5Ul3MHzHOEBFYyIalQ' + '/menusPackages' + '/n97eIgDCIO6wecGkvc19UQ'*/ ;

    //menusUUID = 'SAVkeDwGSBpGRTwOWRLDLQ';

    describe('create test case:',  ()=>{
        it('success create an menus',  ()=> {
            //this.timeout(0);

            return request.post(`${url}/menuServer/api/v1/menus`,menusTestCase,options).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');

                console.log('menus test  create  menusUUID  :' + menusUUID + ' body:'+JSON.stringify(body,null,2));
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an menus  ', function () {
            //this.timeout(0);

            return request.get(`${tenantURL}/menus/${menusUUID}`,{}).then( ( { statusCode,body,headers,request} )=>{

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
            return request.post(`${tenantURL}/menus/${menusUUID}`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('menus test update   :' + JSON.stringify(body));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
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
            return request.get(`${url}/menuServer/api/v1/menus`,qs,options).then( ( { statusCode,body,headers,request} )=>{

                console.log('menus test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });


        it('list treeMenus  ', function () {
            //this.timeout(0);
            let qs = {
                applicationHref:'http://localhost:5000/api/v1.0.0/applications/BQZNqVpEbFxyZ7ayW7x2yA',
             //   menuOrganizationHref : 'http://localhost:6001/api/v1.0.0/menuOrganizations/rIdUW07jGttn5VNGcPvnuQ',
            };
            return request.get(`${url}/treeMenus`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('menus test treeMenus   :' + JSON.stringify(body));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });



    });

    describe('delete test case:',()=>{
        it('success delete an menus', function () {
            //this.timeout(0);

           /* return request.delete(`${tenantURL}/menus/${menusUUID}`).then( ( { statusCode,body,headers,request} )=>{
                expect(statusCode).to.equal(204);
            });*/
        });
    });
});