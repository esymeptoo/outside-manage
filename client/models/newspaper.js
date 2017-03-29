/**
 * Created by e on 17/3/29.
 */
import fetch from 'dva/fetch';

export default {
    namespace: 'push_task',
    state: {

    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/daily/newspaper') {
                    dispatch({
                        type: 'queryNews'
                    })
                }
            });
        },
    },
    effects: {
        * queryNews({ payload }, { put }) {
            yield put({
                type: 'over'
            })
            yield fetch(`/query`)
        },
    },
    reducers: {
        over(state, action) {
            return { ...state };
        }
    },
}
