/**
 * Created by e on 17/4/10.
 */
import Router from 'koa-router';
const router = new Router();
import { getGoods, deleteGoods, getStyles, deleteStyles, saveStyles, updateStyles } from '../dao/brand';
import Logger from 'log4js';
const logger = Logger.getLogger('goods');

router.get('/queryGoods', async (ctx) => {
    ctx.body = await getGoods(ctx.query.page, ctx.query.limit);
});
router.post('/deleteGoods', async (ctx) => {
    const res = await deleteGoods(ctx.request.body.goods_id);
    logger.info(`delete _id:${ctx.request.body.goods_id} successfully`);
    if (res.n == 1 && res.ok == 1) {
        //删除成功 继续查询
        const _res = await getGoods(ctx.request.body.page, ctx.request.body.limit);
        ctx.body = {
            result: 1,
            total: _res.total,
            list: _res.list,
        }
    } else {
        logger.error(`delete goods_id:${ctx.request.body.goods_id} fail`);
        ctx.body = {
            result: 0,
        }
    }
});

router.get('/queryStyles', async (ctx) => {
    ctx.body = await getStyles(ctx.query.goods_id);
});

router.post('/deleteStyles', async (ctx) => {
    ctx.body = await deleteStyles(ctx.request.body._id);
});

router.post('/saveStyles', async (ctx) => {
    const { _id } = ctx.request.body;
    let data;
    if (!_id) {
        //新增
        console.log('新增');
        data = await saveStyles(ctx.request.body);
        if (data._id) {
            ctx.body = {
                result: 1,
                style: data,
            }
        } else {
            ctx.body = {
                result: 0
            }
        }
    } else {
        //更新
        console.log('更新');
        data = await updateStyles(ctx.request.body);
        if (data.n ==1 && data.ok == 1) {
            ctx.body = {
                result: 1,
                style: ctx.request.body,
            }
        } else {
            ctx.body = {
                result: 0,
            }
        }
    }
});

export default router;
