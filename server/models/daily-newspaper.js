/**
 * Created by e on 17/3/31.
 */
/*每日一趣表
* 默认每天会有一篇 如果今天没有尽往上面找*/
require('./index');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dailyNews_Schema = new Schema({
    id: String,
    title: String,
    content: String,
    from: String,
    date: String,     /*例如: 2017-03-31  查询mongo就用 日期处理函数之后的字符串去匹配 nice~*/
}, {
    versionKey: false,
});

const DailyNews = mongoose.model("DailyNews", dailyNews_Schema);
exports.dailyNews = DailyNews;
