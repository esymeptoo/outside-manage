/**
 * Created by e on 17/3/31.
 */
module.exports = (env) => {
    let conf;
    try{
        conf = require('./' + (env || process.env.NODE_ENV || 'development'))
    }catch(e){
        conf = {};
    }
    return conf;
}
