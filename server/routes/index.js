'use strict';

import compose from 'koa-compose';
import Router from 'koa-router';


import RouterMain from './main';
import RouterAuth from './auth';
import RouterOpen from './open';
import RouterNews from './news';
import RouterActivity from './activity';
import RouterBrand from './brand';

const router =  new Router();


router.get('/', async (ctx, next) => {
    // ctx.type = 'html'
    // ctx.body = require('fs').createReadStream(__dirname + '/../public/main.html')
    await ctx.render('./main')
})


//router.use('/api', RouterApi.routes(), RouterApi.allowedMethods());
//router.use('/auth', RouterAuth.routes(), RouterAuth.allowedMethods())
//router.use('/open', RouterOpen.routes(), RouterOpen.allowedMethods())
//router.use('/mock', RouterMock.routes(), RouterMock.allowedMethods())
router.use('/news', RouterNews.routes(), RouterNews.allowedMethods());
router.use('/activity', RouterActivity.routes(), RouterActivity.allowedMethods());
router.use('/brand', RouterBrand.routes(), RouterBrand.allowedMethods());

//router.get('*', async (ctx, next) => {
//    ctx.body = { status : 404 }
//})


export default router;


