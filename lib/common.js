'use strict';
var Promise = require('bluebird');
var path = require('path');
var lorem = require('lorem-ipsum');
var MysqlDB = require('./mysql2-bluebird');

var dbInfo;
try {
    dbInfo = require('../mysql.private.json');
} catch (e) {
    dbInfo = require('../mysql.config.json');
}

var db = new MysqlDB(dbInfo);

var insertQuery = (function createQuery() {
    var columns = [];
    var values = [];
    for (var i = 1; i <= 20; i++) {
        columns.push(`v${i}`);
        values.push('?')
    }
    return `INSERT INTO testrows (${columns.join(', ')}) values (${values.join(', ')})`;
})();

function createInsertParams() {
    var params = [];
    for (var i = 0; i < 20; i++) {
        params.push(lorem().slice(0, 99));
    }
    return params;
};

//create constant param for consistent db re-initialization, to be fair to all subjects
var initParams = require('./dbInsertParams.json');

var obj = module.exports = {
    Promise: Promise,
    jadeViewsDir: path.join(process.cwd(), 'views/jade'),
    jadeData: {title: 'Jade performance test', date: new Date},
    json4k: require('../files/4k.json'),
    mysql: {
        db: db,
        createInsertParams: createInsertParams,
        insertRow: function (n, params) {
            n = n || 1;
            var promises = [];
            for(var i = 0; i < n; i++){
                var values = params || createInsertParams();
                promises.push(db.execute(insertQuery, values));
            }
            return Promise.all(promises);
        }
        ,
        selectAll: function () {
            return db.execute('select * from testrows');
        },
        deleteAll: function () {
            return db.execute('delete from testrows');
        }
    },
    getJsonCharactersCount: function (obj) {
        return JSON.stringify(obj).length
    }
};

//add functions with internal dependency
obj.mysql.initialize = function(){
    return obj.mysql.deleteAll()
        .then(function(){
            obj.mysql.insertRow(10, initParams);
        })
}
