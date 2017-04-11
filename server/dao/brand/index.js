/**
 * Created by e on 17/4/10.
 */
const goods = require('../../models/brand').goods;
const styles = require('../../models/styles').styles;
import promise from 'promise';

module.exports = {
    getGoods: (page, limit) => {
        limit = parseInt(limit);
        return new promise((resolve, reject) => {
            const query = goods.find();
            query.skip((page - 1) * limit);
            query.limit(limit);
            query.sort({'date': -1});
            query.exec(function(err, docs){
                if (err) {
                    reject(err);
                }
                goods.find({}, (err, _docs) => {
                    if (err) {
                        reject(err);
                    }
                    resolve({list: docs, total: _docs.length})
                })
            });
        })
    },
    deleteGoods: (id) => {
        return new promise((resolve, reject) => {
            goods.remove({goods_id: id}, (err, docs) => {
                if (err) {
                    reject(err);
                }
                resolve(docs.result);
            })
        })
    },
    getStyles: (id) => {
        return new promise((resolve, reject) => {
            styles.find({goods_id: id}, (err, docs) => {
                if (err) {
                    reject(err);
                }
                resolve(docs);
            })
        })
    },
    deleteStyles: (id) => {
        return new promise((resolve, reject) => {
            styles.remove({_id: id}, (err, docs) => {
                if (err) {
                    reject(err);
                }
                resolve(docs.result);
            })
        })
    },
    saveStyles: (data) => {
        return new promise((resolve, reject) => {
            const beta = new styles(data);
            beta.save((err, docs) => {
                if (err) {
                    reject(err);
                }
                resolve(docs);
            })
        })
    },
    updateStyles: (data) => {
        return new promise((resolve, reject) => {
            styles.update({_id: data._id}, {$set: data}, (err, docs) => {
                if (err) {
                    reject(err);
                }
                resolve(docs);
            })
        })
    },
};
