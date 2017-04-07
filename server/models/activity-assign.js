/**
 * Created by e on 17/4/1.
 */
require('./');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activityAssign_Schema = new Schema({
    activity_id: String,
    telephone: Number,
    join_openId: String,
    join_telephone: String,
}, {
    versionKey: false,
});

const activityAssign = mongoose.model("activity-assign", activityAssign_Schema);
exports.activityAssign = activityAssign;
