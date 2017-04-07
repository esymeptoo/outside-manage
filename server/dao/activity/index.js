/**
 * Created by e on 17/3/31.
 */
import promise from 'promise';
const activity = require('../../models/activity').activity;
const activityAssign = require('../../models/activity-assign').activityAssign;
import Logger from 'log4js';
const logger = Logger.getLogger('activity');
module.exports = {
    getActivity: (page, limit) => {
        limit = parseInt(limit);
        return new promise((resolve, reject) => {
            const query = activity.find({type: 0});
            query.skip((page - 1) * limit);
            query.limit(limit);
            query.sort({'date': -1});
            query.exec(function(err, docs){
                if (err) {
                    reject(err);
                }
                activity.find({type: 0}, (err, body) => {
                    if (err) {
                        reject(err);
                    }
                    //得到拉取的长度length
                    const length = docs.length;
                    const index = 0;
                    const total = body.length;
                    getJoinNumById(index, length, docs, total, resolve, reject)
                    //resolve({list: docs, total: body.length});
                });
            });
        })
    },
    deleteActivity: (id) => {
        return new promise((resolve, reject) => {
            activity.remove({_id: id}, (err, docs) => {
                if (err) {
                    reject(err);
                }
                resolve(docs.result);
            })
        })
    },
};
function getJoinNum(index, length, docs) {
    return new promise((resolve, reject) => {
        activityAssign.find({_id: docs[index]._id}, (err, result) => {
            if (err) {
                reject(err);
            }
            docs[index].join_num = result.length;
            resolve(docs);
        })
    })
}
function getJoinNumById(index, length, docs, total, resolve, reject) {
    if (index < length) {
        getJoinNum(index, length, docs)
        .then((data) => {
            index ++;
                getJoinNumById(index, length, data, total, resolve, reject);
        },
            (err) => {
                reject(err);
            })
    } else {
        resolve({list: docs, total: total});
    }
}
