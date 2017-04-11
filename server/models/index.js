/**
 * Created by e on 17/3/31.
 */
const mongoose = require("mongoose");
const config = require('../config')();

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
var db=mongoose.connect(config.mongoDb);

db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
    console.log("数据库连接成功" );
});
