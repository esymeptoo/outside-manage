/**
 * Created by e on 17/3/31.
 */
/**
 * Created by e on 17/3/31.
 */
/**
 * Created by e on 17/3/29.
 */
import fetch from 'dva/fetch';
import { message } from 'antd';

export default {
    namespace: 'activity',
    state: {
        loading: false,
        list: [],
        total: null,
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/activity/list') {
                    dispatch({
                        type: 'queryActivity',
                        payload: {
                            limit: 10,
                            page: 1,
                        }
                    })
                }
            });
        },
    },
    effects: {
        * queryActivity({ payload }, { put }) {
            yield put({
                type: 'loading',
            });
            const res = yield fetch(`/activity/queryActivity?limit=${payload.limit}&page=${payload.page}`);
            if (res.status >= 400) {
                message.error('获取数据失败,请刷新后重试~');
            }
            const list = yield res.json();
            yield put({
                type: 'queryActivitySuccess',
                payload: {
                    list: list.list,
                    total: list.total,
                }
            })
        },
        * activityDelete({ payload }, { put }) {
            yield put({
                type: 'loading',
            });
            const res = yield fetch(`/activity/deleteActivity`, {method: 'POST', body:JSON.stringify(payload), headers:{'Content-Type': 'application/json'}});
            if (res.status >= 400) {
                message.error('获取数据失败,请刷新后重试~');
            }
            const result = yield res.json();
            if (result.result) {
                message.success('删除成功');
                yield put({
                    type: 'deleteSuccess',
                    payload: {
                        list: result.list,
                        total: result.total,
                    }
                })
            } else {
                message.error('删除失败, 请刷新后重试');
            }
        },
    },
    reducers: {
        loading(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        queryActivitySuccess(state, action) {
            return {
                ...state,
                loading: false,
                list: action.payload.list,
                total: action.payload.total,
            }
        },
        deleteSuccess(state, action) {
            return {
                ...state,
                list: action.payload.list,
                total: action.payload.total,
                loading: false,
            }
        },
    },
}
