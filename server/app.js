'use strict';

import Koa from 'koa';
import baseconfig from './config/base';
import middleware from './middleware';

const routes = require('./routes/auth').default;
import config from './config/config';
import log4js from 'log4js';
import Router from 'koa-router';
import path from 'path';
import compose from 'koa-compose';

const app = new Koa();
const LOG = log4js.getLogger('file')
const wosaiFs = require('./modules/fs')


//configure basic app
baseconfig(app)

//configure custom middleware
//app.use(middleware())

const dirTree = wosaiFs.readDirDeepSync(path.resolve(__dirname, 'routes'));
wosaiFs.genRouteByDirTree(dirTree).forEach((route) => {
    app.use(compose([
        require(route.path).default.routes(),
        require(route.path).default.allowedMethods(),
    ]));
});

app.listen(config.app.port);
LOG.info("Server started, listening on port: " + config.app.port);

export default app
