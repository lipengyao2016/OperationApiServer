const  userQuery = require('./userQuery');
const  roleQuery = require('./roleQuery');
const  menuGroupQuery = require('./menuGroupQuery');
const  menuQuery = require('./menuQuery');

module.exports = {
    users:userQuery,
    roles:roleQuery,
    menuGroups:menuGroupQuery,
    menus:menuQuery,
};
