/**
 * Created by e on 17/3/31.
 */
/*官方活动表*/
require('./index');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Activity_Schema = new Schema({
    activity_id: String,
    activity_title: String,
    activity_introduction: String,
    launcher_openId: String | null,         //若为空则为官方发布
    launcher_telephone: String,      //发起者联系方式
    launcher_name: String,
    limit: Number,                   //活动限制人数
    gather_place: String,            //活动集合地点
    end_date: Date,                  //报名结束时间
    type: Number,                     //1代表民间发布 0代表官方发布
    date: Date | null,
    status: Number,                 //活动状态 1表示活动结束
    join_num: Number,
}, {
    versionKey: false,
});

const Activity = mongoose.model("Activity", Activity_Schema);
exports.activity = Activity;
