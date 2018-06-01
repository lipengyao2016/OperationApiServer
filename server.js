/**
 * Created by Administrator on 2018/1/8.
 */
const log4js = require('./log4js');
const package = require('./package.json');
const config = require('./config/config');
const router = require('./router/router');

// 依次从系统环境变量、配置文件（配置环境或文件）读取服务端口，默认为3000
const utils = require('develop-utils');

const server_name = package.name;
const ip = config.server.domain;
const port = process.env.PORT || config.server.port || '3000';


const Koa = require('koa');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');

const app = new Koa();
const jsonExpand = require('koa-json-url-expand');
const jwt = require('koa-jwt');
const _  =require('lodash');

const betterproxy = require('koa-better-http-proxy');
const url = require('url');
const convert = require('koa-convert');

const resourceURI = require('./controllers/resource/resourceURI');
const URIParser = resourceURI.v1;
const jwtFilter = require('./router/jwtFilter');
const qs = require('querystring');

app.use(logger());
app.use(bodyparser({jsonLimit: '10mb'}));


// JWT
app.use(async (ctx,next)=>{
    console.log('query:',ctx.query);
    let jwt_opt = { secret: config.jwt.public_key, algorithms: ['RS256'] ,passthrough:false};
    //优先使用Header头信息中的认证信息，若没有则使用query中的token
    if(!ctx.header.authorization){
        jwt_opt.getToken = function(){
            return ctx.query.token;
        };
    }

    if(!ctx.query.token && !ctx.header.authorization)
    {
        console.log(' no token in header and query!!!');
        //await  next();

        let error = new Error();
        error.name = 'no token';
        error.code = 9999;
        error.message = 'no token';
        error.description = '';
        ctx.status = 401;
        ctx.body = error;
    }
    else
    {
        try {
            await jwt(jwt_opt).call(null,ctx,next)/*.unless({ path: [/^\/authServer/] })*/;
        }
        catch (err){
            console.error(' user jwt error :' + err);
            let error = new Error();
            error.name = err.name;
            error.code = 9999;
            error.message = err.message;
            error.description = '';
            ctx.status = 401;
            ctx.body = error;
        }
    }



});
app.use(async (ctx,next)=>{
    if (ctx.state && ctx.state.user)
    {
        console.log('tokenInfo:',ctx.state.user);
       // utils.checkRequiredParams(ctx.state.user,['user','merchant']);
        let {user,merchant,application,roles}=ctx.state.user;
        let userHref = URIParser.baseResourcesURI(config.serverIndexs.User_Server,'users') + `/${user.uuid}`;
        let merchantHref = URIParser.baseResourcesURI(config.serverIndexs.Merchant_Server,'merchants')+ `/${merchant.uuid}`;
        let applicationHref = URIParser.baseResourcesURI(config.serverIndexs.Account_Server,'applications')+ `/${application.uuid}`;
        let roleHref = '';
        if(roles.length > 0)
        {
            roleHref = URIParser.baseResourcesURI(config.serverIndexs.Role_Server,'roles')+ `/${roles[0].uuid}`;
        }
        ctx.jwt = _.cloneDeep(ctx.state.user);
        ctx.jwt.userUUID = user.uuid;
        ctx.jwt.merchantUUID = merchant.uuid;

        ctx.jwt.userHref = userHref;
        ctx.jwt.merchantHref = merchantHref;
        ctx.jwt.applicationHref = applicationHref;
        ctx.jwt.roleHref= roleHref;
        console.log(`merchant: ${ctx.jwt.merchantUUID} , user: ${ctx.jwt.userUUID}`);

        await  jwtFilter.filter(ctx);
        console.log('jwtFilter->filter end.');

    }

    await next();
});

app.use(async (ctx,next)=>{
    if(ctx.method == 'POST' || ctx.method == 'PUT'){
        console.log(`body:\n${JSON.stringify(ctx.request.body,null,2)}`);
    }
    else if(ctx.method == 'GET')
    {
        console.log(`query:\n${JSON.stringify(ctx.query,null,2)}`);
    }
    await next();
});


app.use(convert(betterproxy('localhosxxxt:60002', {
    filter: function(ctx) {
        return ctx.path.indexOf('/api') >= 0;
    },

    proxyReqPathResolver: function(ctx) {
        let path = ctx.path;

        let serverIndex = path.indexOf('/',1);
        // let serverName = urlData.path.substr(1,serverIndex-1);
        let serverPath = path.substr(serverIndex);

        let queryString = qs.stringify(ctx.query);

        if(!_.isEmpty(queryString))
        {
            serverPath += `?${queryString}`;
        }
        console.log('httpproxy,url:' + serverPath);

        return serverPath ;
    },

    proxyReqOptDecorator: function(proxyReqOpts, ctx) {

        let path = ctx.path;

        let serverIndex = path.indexOf('/',1);
        let serverName = path.substr(1,serverIndex-1);

        //let serverPath = urlData.path.substr(serverIndex);
        //proxyReqOpts.path = serverPath;

        proxyReqOpts.host = 'localhost';
        proxyReqOpts.port = 60002;
        if(config[serverName])
        {
            proxyReqOpts.port = config[serverName].port;
            proxyReqOpts.host = config[serverName].host;
        }

        console.log(' httpProxy path:' + path + ',serverName:' + serverName + ',host:' + proxyReqOpts.host
            + ',port:' + proxyReqOpts.port);

/*        if(serverName == 'menuServer')
        {
            proxyReqOpts.port = 6001;
        }
        else if(serverName == 'roleServer')
        {
            proxyReqOpts.port = 6002;
        }
        else if(serverName == 'userServer')
        {
            proxyReqOpts.port = 6003;
        }*/

        return proxyReqOpts;
    }

})));


//app.use(jsonExpand.routerPlugin);

app.use(router.routes());
let server = app.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Event listener for HTTP server "error" event.
function onError(error) {
    if(error.syscall !== 'listen'){ throw error; }
    let bind = typeof port === 'string' ? (`pipe ${port}`) : (`port ${port}`);
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error('[Server Start] --> '+bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error('[Server Start] --> '+bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
//Event listener for HTTP server "listening" event.
function onListening() {
    let addr = this.address();
    // let bind = typeof addr === 'string' ? (`pipe ${addr}`) : (`port ${addr.port}`);

    console.log(`[Server Start] --> ${server_name} listening on ${ip}:${addr.port}`);
}


