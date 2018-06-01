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


let usersTestCase =
    {
        name: '王文',
        //departmentHref:'http://localhost:6003/api/v1.0.0/departments/02HYJGTmTSzXh5vUogXWoQ',

        roleHref:'http://192.168.7.26:6002/api/v1.0.0/roles/drxoJWYKGWcO68I0QSKxIQ',

        // accountHref:'http://localhost:6002/api/v1.0.0/accounts/aDku0D9gZ2bHeJS5jyL5YQ',
    };



describe('users Test Case:',()=>{



    let applicationUUID = 'AppUUIDForTestCase';
    let usersUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url + '/userServer/api/v1' ;

    //usersUUID = 'f9qXOQgFx8YD9xDlGhRDWw';

    describe('create test case:',  ()=>{

        it('success create an users',  ()=> {
            //this.timeout(0);

            return requestHelper.post(`${tenantURL}/users`,usersTestCase,options).then( ( {statusCode, body, headers, requestHelper} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');


                usersUUID = devUtils.getLastResourceUUIDInURL(body.href);

                console.log('users test  create  usersUUID  :' + usersUUID + ' body:'+JSON.stringify(body,null,2));
            });
        });


        it('register a User  test case:',  function (){
            //this.timeout(0);
            let  data = {
                user:{
                    name: 'wensu22',
                    email: 'wensu22@sina.com',
                    roleHref:'http://192.168.7.26:6002/api/v1.0.0/roles/drxoJWYKGWcO68I0QSKxIQ',
                },
                account:
                    {
                        "name": "wensu22",          // 账户名
                        "password": new Buffer("888888").toString('base64'),
                    }
            };

            return requestHelper.post(`${url}/platformBusiServer/api/v1/registerUser`,data,options).then(function ({statusCode,body,headers,requestHelper}) {
                console.log('registerUser body:',JSON.stringify(body,null,2));
                expect(statusCode).to.equal(201);
            })
        });

    });
    describe('retrieve test case:', function () {
        it('success retrieve an users  ', function () {
            //this.timeout(0);

            return requestHelper.get(`${tenantURL}/users/${usersUUID}`,{}).then( ( { statusCode,body,headers,requestHelper} )=>{

                console.log('users test retrieve   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(usersTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an users', function () {
            //this.timeout(0);

            let updateInfo = {
                roleHref:'http://localhost:6002/api/v1.0.0/roles/cDku0D9gZ2bHeJS5jyL5YQ',
            };
            updateInfo.email = '04@qq.com';
            return requestHelper.post(`${tenantURL}/users/${usersUUID}`,updateInfo).then( ( { statusCode,body,headers,requestHelper} )=>{

                console.log('users test update   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });
    describe('list test case:', function () {


        it('list users  ', function () {
            //this.timeout(0);
            let qs = {
               // name:'*user*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
                //usersPackageUUID:'xAdNYJaUdyyXyFmd1rFkUg',
               // orderBy:'uiOrder DESC',
              //  applicationHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA',
            };
            return requestHelper.get(`${tenantURL}/users`,qs,options).then( ( { statusCode,body,headers,requestHelper} )=>{

                console.log('users test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });


    });

    describe('delete test case:',()=>{
        it('success delete an users', function () {
            //this.timeout(0);
            return requestHelper.delete(`${tenantURL}/users/${usersUUID}`).then( ( { statusCode,body,headers,requestHelper} )=>{
                expect(statusCode).to.equal(204);
            });
        });
    });
});