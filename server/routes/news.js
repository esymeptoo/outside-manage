/**
 * Created by e on 17/3/31.
 */
import Router from 'koa-router';
const router = new Router();
import { getNews, addNews, deleteNews } from '../dao/news';
import Logger from 'log4js';
const logger = Logger.getLogger('news');

router.get('/queryNews', async (ctx) => {
    const res = await getNews();
    ctx.body = res;
});
router.post('/deleteNews', async (ctx) => {
    logger.info(`delete _id:${ctx.request.body._id}`);
    const res = await deleteNews(ctx.request.body._id);
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
