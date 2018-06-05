/**
 * Created by Administrator on 2016/8/18.
 */
const Router = require('koa-router');
let router = new Router();
const { graphqlKoa ,graphiqlKoa } = require('apollo-server-koa');
//const   schema= require('./schema');
//const   schema= require('./graphSchema');

const   schema= require('../schemes/schemeIndex');

/*const goodPackagesInterface = require('../controllers/interface/goodPackagesInterface');
const goodsInterface = require('../controllers/interface/goodsInterface');*/

/*// 创建包裹
router.post('/api/:version/goodsPackages',goodPackagesInterface.createGoodPackages);

//列表包裹。
router.get('/api/:version/goodsPackages',goodPackagesInterface.listGoodPackages);

router.get('/api/:version/packageDetails',goodPackagesInterface.getPackageDetails);

/!** 2018/4/23  分拣货物。
 lpy-modifyed  *!/
router.post('/api/:version/sortGoods',goodsInterface.sortGoods);*/

async function graphKoaFunc(ctx, next) {
    return await graphqlKoa({
        schema: schema,
        context: ctx,
        rootValue: {},
    })(ctx,next);
}



router.post('/graphql',graphKoaFunc);

router.get('/graphql', graphKoaFunc);

router.get('/graphiql', graphiqlKoa({
        endpointURL: '/graphql', // a POST endpoint that GraphiQL will make the actual requests to
    }),
);

module.exports = router;
