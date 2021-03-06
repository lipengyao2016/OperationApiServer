const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const request = require('common-request').request;

let header =
    {
        "authorization": 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InV1aWQiOiJXdDRjMVZ4alJNQ3lHakhGdk5yZlhRIiwibmFtZSI6ImxpdXpvbmcifSwibWVyY2hhbnQiOnsidXVpZCI6IjBCbEFRaTNCWEFFRUV1cmhZa1ZjZ0EiLCJuYW1lIjoi5bmz5Y-w5byA5Y-R5ZWGIiwibnVtYmVyIjoiOTAwMDAxIn0sImFwcGxpY2F0aW9uIjp7InV1aWQiOiJTYWQ5WUhEWGhtOWN5TWVvTnZyMmlnIiwibmFtZSI6IkxhaUtvby1QbGF0Zm9ybSJ9LCJyb2xlIjp7InV1aWQiOiJjckl1WjhBY1VIQmRKQXhWVlNsSEhRIiwibmFtZSI6IuW3peeoi-W4iCJ9LCJpYXQiOjE1Mjc4NDMxMTIsImV4cCI6MTUyNzg1MDMxMn0.SxRWgw5BUcBibV34NKiwQQstn5QntaPElaq9k1tp1JZrdcc8C9PKeZLY0t2WbdeUmU-ohJ89UqF5bpcssPcEoEvNYPzRSJLCs-pnK0u1pRsmgaHFJXXRBy6lzYTFoA_2nG9TKGG3sZ5xcBxVRl5ljTxhCB3sY8No5TM2E3C99_I',
    };

let options = {
    headers: header,
};

let usersTestCase =
    {
        name: '王文',
        //departmentHref:'http://localhost:6003/api/v1.0.0/departments/02HYJGTmTSzXh5vUogXWoQ',

        roleHref:'http://192.168.7.26:6002/api/v1.0.0/roles/drxoJWYKGWcO68I0QSKxIQ',

        // accountHref:'http://localhost:6002/api/v1.0.0/accounts/aDku0D9gZ2bHeJS5jyL5YQ',
    };


async function testLoopUser()
{
    console.log('testLoopUser start.');

    let userItems = [];
    for(let i = 0 ;i <10;i++)
    {
        let userData = _.clone(usersTestCase);
        userData.name = userData.name + i;
        userItems.push(userData);
    }
    let userCreateListReqs = userItems.map(userItem=>{
        return request.post(`${url}/userServer/api/v1/users`,userItem,options);
    })

    let userReps = await Promise.all(userCreateListReqs);

    let userHrefs = [];
    userReps.map( ({statusCode,body}) => {
        if(statusCode == 201)
        {
            userHrefs.push(body.href);
        }
        else
        {
            console.error('create user error,statusCode:' + statusCode + ',body:' + JSON.stringify(body));
        }
    });


    let userUpdateListReqs = userHrefs.map((userHref,index)=>{
        return request.post(userHref,{
            name:'home' + index,
            roleHref:'http://192.168.7.26:6002/api/v1.0.0/roles/crIuZ8AcUHBdJAxVVSlHHQ',
        });
    })

    let userUpdateReps = await Promise.all(userUpdateListReqs);
    userUpdateReps.map( ({statusCode,body}) => {
        if(statusCode == 200)
        {

        }
        else
        {
            console.error('update user error,statusCode:' + statusCode + ',body:' + JSON.stringify(body));
        }
    });


    let userDelReqs = userHrefs.map((userHref,index)=>{
        return request.delete(userHref);
    })

    let userDelReps = await Promise.all(userDelReqs);
    userDelReps.map( ({statusCode,body}) => {
        if(statusCode == 204)
        {

        }
        else
        {
            console.error('delete user error,statusCode:' + statusCode + ',body:' + JSON.stringify(body));
        }
    });

    console.log('testLoopUser end.');

    return 'ok';


}

testLoopUser().then(data=>{
    console.log('loop ,ret:' + data);
})

