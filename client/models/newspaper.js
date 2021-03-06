/**
 * Created by e on 17/3/29.
 */
import fetch from 'dva/fetch';
import { message } from 'antd';

export default {
    namespace: 'newspaper',
    state: {
        loading: true,
        list: [],
        total: 10,
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
            const res = yield fetch(`/news/queryNews`);
            if (res.status >= 400) {
                message.error('获取数据失败,请刷新后重试~');
            }
            const list = yield res.json();
            yield put({
                type: 'queryNewsSuccess',
                payload: {
                    list: list,
                }
            })
        },
        * newsDelete({ payload }, { put }) {
            const res = yield fetch(`/news/deleteNews`, {method: 'POST', body:JSON.stringify(payload), headers:{'Content-Type': 'application/json'}});
            if (res.status >= 400) {
                message.error('获取数据失败,请刷新后重试~');
            }
            const result = yield res.json();
            console.log(result);
            if (result.result) {
                message.success('删除成功');
                yield put({
                    type: 'deleteSuccess',
                    payload: {
                        _id: payload._id,
                    }
                })
            } else {
                message.error('删除失败, 请刷新后重试');
            }

        },
    },
    reducers: {
        queryNewsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                list: action.payload.list,
                total: action.payload.list.length,
            }
        },
        deleteSuccess(state, action) {
            const list = state.list.filter((item) => {
                return item._id != action.payload._id;
            })
            return {
                ...state,
                list: list,
                total: list.length,
            }
        },
    },
}
