var DataLoader = require('dataloader');
var _ = require('lodash');



let userDatas = [
    { id: 2, name: 'San Francisco' },
    { id: 9, name: 'Chicago' },
    { id: 1, name: 'New York' }
];

var userLoader = new DataLoader(keys => {

    console.log('call dataloader start  keys:' + JSON.stringify(keys));

    let userReq = keys.map(key=>{
        let user = _.find(userDatas,userItem=>_.isEqual(userItem.id,key));
        return user;
    });

    console.log('call dataloader end keys:' + JSON.stringify(keys));

    return Promise.resolve(userReq);
}, { cache: false });

userLoader.load(2).then(val=>{
    console.log('get 2 val:' + JSON.stringify(val));
});

userLoader.load(9).then(val=>{
    console.log('get 9 val:' + JSON.stringify(val));
});

userLoader.load(1).then(val=>{
    console.log('get 1 val:' + JSON.stringify(val));
});


function foo() {
    console.error('foo');
}

function koo() {
    console.error('koo');
}

process.nextTick(foo);
koo();
console.error('bar');