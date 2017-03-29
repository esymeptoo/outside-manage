'use strict';

import compose from 'koa-compose';
import Router from 'koa-router';


import RouterMain from './main';
import RouterAuth from './auth';
import RouterOpen from './open';

const router =  new Router();


router.get('/', async (ctx, next) => {
    // ctx.type = 'html'
    // ctx.body = require('fs').createReadStream(__dirname + '/../public/main.html')

    await ctx.render('./main')
})
router.get('/query', async (ctx) => {
    console.log('>>>');
})
//
//router.use('/api', RouterApi.routes(), RouterApi.allowedMethods());
//router.use('/auth', RouterAuth.routes(), RouterAuth.allowedMethods())
//router.use('/open', RouterOpen.routes(), RouterOpen.allowedMethods())
//router.use('/mock', RouterMock.routes(), RouterMock.allowedMethods())

//router.get('*', async (ctx, next) => {
//    ctx.body = { status : 404 }
//})


export default router;


