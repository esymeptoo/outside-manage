/**
 * Created by e on 17/3/29.
 */
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
                if (location.pathname === '/daily/addNews') {
                    dispatch({
                        type: 'queryNews'
                    })
                }
            });
        },
    },
    effects: {

    },
    reducers: {

    },
}
