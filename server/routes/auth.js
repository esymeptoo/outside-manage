'use strict';

import Router from 'koa-router';
import passport from 'koa-passport';
import compose from 'koa-compose';

const router = new Router();

router.get('/login', async (ctx, next) => {
    ctx.body = {
        "status" : "login page"
    }
})


router.post('/login', async (ctx, next) => {
    let middleware = passport.authenticate('local', async(user, info) => {
        if (user === false) {
            ctx.body = {
                'status' : 400
            }
        } else {
            await ctx.login(user)
            ctx.body = {
                user: user
            }
        }
    })
    await middleware.call(this, ctx, next)
})

router.get('/logout', async (ctx, newt) => {
    ctx.logout()
    ctx.redirect('/')
})

router.get('/status', async (ctx, next) => {
    ctx.body = {
        "isLogin" : true,
    }
})
//export default function routes() {
//    return compose(
//        [
//            router.routes(),
//            router.allowedMethods()
//        ]
//    )
//}
export default router;
