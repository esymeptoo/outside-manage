// import './index.html'
import dva from 'dva';
import { hashHistory } from 'dva/router';

// 1. Initialize

// 2. Model

const app = dva({
    history: hashHistory,
});
// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
