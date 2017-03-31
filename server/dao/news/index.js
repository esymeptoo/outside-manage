/**
 * Created by e on 17/3/31.
 */
import promise from 'promise';
const news = require('../../models/daily-newspaper').dailyNews;
module.exports = {
    getNews: () => {
        return new promise((resolve, reject) => {
            news.find({}, (err, docs) => {
                if (err) {
                    reject(err);
                }
                resolve(docs);
            })
        })
    },
    addNews: (data) => {
        return new promise((resolve, reject) => {
            const beta = new news(data);
            beta.save((err, body) => {
                if (err) {
                    reject(err);
                }
                resolve(body);
            })
        })
    },
    editNews: (data) => {
        return new promise((resolve, reject) => {
            news.update({_id: data.id}, data, (err, docs) => {
                if (err) {
                    reject(err);
                }
                resolve(docs);
            })
        })
    },
    deleteNews: (id) => {
        return new promise((resolve, reject) => {
            news.remove({_id: id}, (err, docs) => {
                if (err) {
                    reject(err);
                }
                resolve(docs.result);
            })
        })
    }
};
