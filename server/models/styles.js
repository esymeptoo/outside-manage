/**
 * Created by e on 17/4/10.
 */
require('./');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const styles_Schema = new Schema({
    goods_id: String,
    goods_num: Number,
    goods_price: Number,
    color: String,
}, {
    versionKey: false,
});

const styles = mongoose.model("styles", styles_Schema);
exports.styles = styles;
