/**
 * Created by e on 17/3/31.
 */
import Router from 'koa-router';
const router = new Router();
import { getActivity, deleteActivity } from '../dao/activity';
import Logger from 'log4js';
const logger = Logger.getLogger('activity');

router.get('/queryActivity', async (ctx) => {
    ctx.body = await getActivity(ctx.query.page, ctx.query.limit);
});
router.post('/deleteActivity', async (ctx) => {
    const res = await deleteActivity(ctx.request.body._id);
    logger.info(`delete _id:${ctx.request.body._id} successfully`);
    if (res.n == 1 && res.ok == 1) {
        //删除成功 继续查询
        const _res = await getActivity(ctx.request.body.page, ctx.request.body.limit);
        ctx.body = {
            result: 1,
            total: _res.total,
            list: _res.list,
        }
    } else {
        logger.error(`delete _id:${ctx.request.body._id} fail`);
        ctx.body = {
            result: 0,
        }
    }
});
export default router;
