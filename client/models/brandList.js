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
    namespace: 'brandList',
    state: {
        loading: false,
        loading1: false,
        list: [],
        total: null,
        styles: [],
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/brand/list') {
                    dispatch({
                        type: 'queryBrand',
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
        * queryBrand({ payload }, { put }) {
            yield put({
                type: 'loading',
            });
            const res = yield fetch(`/brand/queryGoods?limit=${payload.limit}&page=${payload.page}`);
            if (res.status >= 400) {
                message.error('获取数据失败,请刷新后重试~');
            }
            const list = yield res.json();
            yield put({
                type: 'queryGoodsSuccess',
                payload: {
                    list: list.list,
                    total: list.total,
                }
            })
        },
        * goodsDelete({ payload }, { put }) {
            yield put({
                type: 'loading',
            });
            const res = yield fetch(`/brand/deleteGoods`, {method: 'POST', body:JSON.stringify(payload), headers:{'Content-Type': 'application/json'}});
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
        * queryStyles ({ payload }, { put }) {
            yield put({
                type: 'showLoading1',
            });
            const res = yield fetch(`/brand/queryStyles?goods_id=${payload.goods_id}`);
            if (res.status >= 400) {
                message.error('获取数据失败,请刷新后重试~');
            }
            const data = yield res.json();
            yield put({
                type: 'queryStylesSuccess',
                payload: {
                    styles: data,
                }
            })
        },
        * deleteStyles ({ payload }, { put }) {
            const res =yield fetch(`/brand/deleteStyles`, {method: 'POST', body:JSON.stringify(payload), headers:{'Content-Type': 'application/json'}});
            if (res.status >= 400) {
                message.error('删除失败,请刷新后重试!');
            }
            const data = yield res.json();
            if (data.n ==1 && data.ok == 1) {
                message.error('删除成功~');
                yield put({
                    type: 'deleteStylesSuccess',
                    payload: {
                        _id: payload._id,
                    }
                })
            } else {
                message.error('删除失败,请刷新后重试');
            }
        },
        * saveStyles ({ payload }, { put }) {
            const res =yield fetch(`/brand/saveStyles`, {method: 'POST', body:JSON.stringify(payload.styles), headers:{'Content-Type': 'application/json'}});
            if (res.status >= 400) {
                message.error('更新失败,请刷新后重试!');
            }
            const data = yield res.json();
            console.log(data);
            if (data.result == 0) {
                message.error('保存失败,请刷新后重试~')
            } else {
                message.success('保存成功~')
                yield put({
                    type: 'saveStylesSuccess',
                    payload: {
                        style: data.style,
                    }
                })
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
        showLoading1(state, action) {
            return {
                ...state,
                loading1: true,
            }
        },
        queryGoodsSuccess(state, action) {
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
        queryStylesSuccess (state, action) {
            return {
                ...state,
                styles: action.payload.styles,
                loading1: false,
            }
        },
        deleteStylesSuccess (state, action) {
            const styles = state.styles.filter((e) => {
                return e._id != action.payload._id;
            });
            return {
                ...state,
                styles: styles,
            }
        },
        saveStylesSuccess(state, action) {
            let styles = state.styles;
            for (var i = 0; i < styles.length; i++) {
                if (styles[i]._id == action.payload.style._id) {
                    styles[i] = action.payload.style;
                    return {
                        ...state,
                        styles: styles,
                    }
                }
            }
            if (i == state.styles.length) {
                styles.push(action.payload.style);
                return {
                    ...state,
                    styles: styles,
                }
            }
        }
    },
}
