/**
 * Created by e on 17/3/31.
 */
import Router from 'koa-router';
const router = new Router();
import { getActivity, deleteActivity } from '../dao/activity';
import Logger from 'log4js';
const logger = Logger.getLogger('activity');

router.get('/queryActivity', async (ctx) => {
    ctx.body = await getActivity();
});
router.post('/deleteActivity', async (ctx) => {
    const res = await deleteActivity(ctx.request.body._id);
    if (res.n == 1 && res.ok == 1) {
        logger.info(`delete _id:${ctx.request.body._id} successfully`);
        ctx.body = {
            result: 1,
        }
    } else {
        logger.error(`delete _id:${ctx.request.body._id} fail`);
        ctx.body = {
            result: 0,
        }
    }
});

export default router;
