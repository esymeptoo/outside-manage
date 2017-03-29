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
                    replace('user/login');
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
                    name: 'newspaper',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            registerModel(app, require('./models/newspaper'));
                            cb(null, require('./routes/daily/newspaper'))
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
