/**
 * Created by e on 17/3/31.
 */
/*商品表*/
require('./');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goods_Schema = new Schema({
    goods_id: String,
    cover: String,        /*轮播图*/
    goods_name: String,    /*商品名*/
    lowest_price: Number,
    highest_price: Number,       /*最低价 最高价  现实的时候折中显示*/
    content: String,      /*介绍*/
    date: Date,
    number: Number,
}, {
    versionKey: false,
});

const goods = mongoose.model("goods", goods_Schema);
exports.goods = goods;
