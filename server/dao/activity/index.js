/**
 * Created by e on 17/3/31.
 */
import promise from 'promise';
const activity = require('../../models/activity').activity;
module.exports = {
    getActivity: () => {
        return new promise((resolve, reject) => {
            const query = activity.find({type: 0});
            query.sort({'date': -1});
            query.exec(function(err, docs){
                if (err) {
                    reject(err);
                }
                resolve(docs);
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
