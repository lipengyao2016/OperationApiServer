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


describe('roles Test Case:',()=>{
    let rolesTestCase = {
        name:'总监',
        permissions:[
            {
                objectHref:'http://192.168.7.26:6001/api/v1.0.0/menus/MJ4Hj4YVytC3nVPvj78JAA',
                objectType:'menu',
                applicationHref:'http://192.168.7.26:5000/api/v1.0.0/applications/Sad9YHDXhm9cyMeoNvr2ig',
            },
            {
                objectHref:'http://192.168.7.26:6001/api/v1.0.0/operators/n7cweuq2u07qSfM7lT3qBA',
                objectType:'operator',
                applicationHref:'http://192.168.7.26:5000/api/v1.0.0/applications/Sad9YHDXhm9cyMeoNvr2ig',
            },
        ],
    };
    let applicationUUID = 'AppUUIDForTestCase';
    let rolesUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url + '/roleServer/api/v1' ;

  //  rolesUUID = '4po7G4eCiSztrYzqsyLisg';

    describe('create test case:',  ()=>{
        it('success create an roles',  ()=> {
            //this.timeout(0);

            return requestHelper.post(`${tenantURL}/roles`,rolesTestCase,options).then( ( {statusCode, body, headers, requestHelper} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.name).to.equal(rolesTestCase.name);


                rolesUUID = devUtils.getLastResourceUUIDInURL(body.href);

                console.log('roless test  create  rolesUUID  :' + rolesUUID +
                    ' body:'+JSON.stringify(body,null,2));
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an roles  ', function () {
            //this.timeout(0);

            return requestHelper.get(`${tenantURL}/roles/${rolesUUID}`,{}).then( ( { statusCode,body,headers,requestHelper} )=>{

                console.log('roless test retrieve   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(rolesTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an roles', function () {
            //this.timeout(0);
            let updateInfo = {
                name:'经理kk',
                permissions:[
                    {
                        objectHref:'http://localhost:6001/api/v1.0.0/menus/phqDQR0eNdzirHypMrPbkA',
                        objectType:'menu',
                        applicationHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA',
                    },
                    {
                        objectHref:'http://localhost:6001/api/v1.0.0/operators/Ji34HNJ7v1eOtjWnDebAKw',
                        objectType:'operator',
                        applicationHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA',
                    },
                ],
            };
            updateInfo.description = 'lpy descript';
            return requestHelper.post(`${tenantURL}/roles/${rolesUUID}`,updateInfo).then( ( { statusCode,body,headers,requestHelper} )=>{

                console.log('roless test update   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });
    describe('list test case:', function () {
        it('list roless by all', function () {
            //this.timeout(0);
            let merchantLists = [
                'RQZNqVpEbFxyZ7ayW7x2yA',
                'PQZNqVpEbFxyZ7ayW7x2yA'];
            let qs = {
               // name:'*abinet*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
 /*               offset:0,
                limit:1,
                createdAt:'[,2018-04-18 18:13:28]'*/
            };

            return requestHelper.get(`${tenantURL}/roles/listAll`,qs).then( ( { statusCode,body,headers,requestHelper} )=>{

                console.log('roless test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });


        it('list roless  ', function () {
            //this.timeout(0);
            let merchantLists = [
                'RQZNqVpEbFxyZ7ayW7x2yA',
                'PQZNqVpEbFxyZ7ayW7x2yA'];
            let qs = {
              //  name:'*good*',
                //uuid:['3UCHOeNl5tVmN83fkyQfNQ','V1bg0v8SlXKs8OXApykNzg'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
            };
            return requestHelper.get(`${tenantURL}/roles`,qs,options).then( ( { statusCode,body,headers,requestHelper} )=>{

                console.log('roless test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });


        it('get a Role details test case:',  function (){
            //this.timeout(0);
            let  qs = {
                /*  roleHref:'http://localhost:6002/api/v1.0.0/roles/ujoQyy5P95WoR1KOFjuG5g',
                  applicationHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA',*/

                roleUUID:'GUu4Zz0788NughRrzYh7dw',
                //roleHref:'http://localhost:6002/api/v1.0.0/roles/jmVlM29n94ZRRIRXhW1d6w',

            };

            return requestHelper.get(`${url}/platformBusiServer/api/v1/roleDetails`,qs,options).then(function ({statusCode,body,headers,requestHelper}) {
                console.log('body:',JSON.stringify(body,null,2));
                expect(statusCode).to.equal(200);
            })
        });


    });

    describe('delete test case:',()=>{
        it('success delete an roles', function () {
            //this.timeout(0);


            return requestHelper.delete(`${tenantURL}/roles/${rolesUUID}`).then( ( { statusCode,body,headers,requestHelper} )=>{
                console.log('roless test delete   :' + JSON.stringify(body,null,2));
                expect(statusCode).to.equal(204);
            });
        });
    });
});