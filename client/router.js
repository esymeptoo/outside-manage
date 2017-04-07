import React, { PropTypes }from 'react'
import { Router } from 'dva/router'

const cached = {};
function registerModel(app, model) {
    if (!cached[model.namespace]) {
        app.model(model);
        cached[model.namespace] = 1;
    }
}
function routesConfig({ history, app }) {
    const routes = [
        {
            path: '/',
            indexRoute: {
                onEnter: (nextState, replace) => {
                    replace('daily/newspaper');
                },
            },
            childRoutes: [
                {
                    path: 'user/login',
                    name: 'login',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            cb(null, require('./routes/login'))
                        })
                    }
                },
                {
                    path: 'daily/newspaper',
                    name: 'newspaperList',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('./models/newspaper'));
                            cb(null, require('./routes/daily/newspaper'))
                        })
                    }
                },
                {
                    path: 'daily/addNews',
                    name: 'addNews',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('./models/addNewspaper'));
                            cb(null, require('./routes/daily/addNewspaper'))
                        })
                    }
                },
                {
                    path: 'activity/list',
                    name: 'activityList',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('./models/activity'));
                            cb(null, require('./routes/activity/activity'))
                        })
                    }
                }
            ]
        }
    ]
    return <Router history={history} routes={routes} />
}
routesConfig.propTypes = {
    history: PropTypes.shape.isRequired,
};
routesConfig.defaultProps = {
};
module.exports = routesConfig;
