'use strict';
var path = require('path');
var mysql2 = require('mysql2');
var Blue = require('bluebird');
Blue.promisifyAll(require("mysql2/lib/connection").prototype);
Blue.promisifyAll(require("mysql2/lib/pool").prototype);
var dbInfo = require('../mysql.config.json');

var pool = mysql2.createPool(dbInfo);

function mysqlGetConnection(){
    return pool.getConnectionAsync()
        .disposer(function (connection) {
            connection.release();
        })
}

function mysqlExecute (query, params) {
    return Blue.using(mysqlGetConnection(), function(cn){
        return cn.executeAsync(query)
    })
}

module.exports = {
    jadeViews: path.join(process.cwd(), 'views/jade'),
    jadeData: {title: 'Jade performance test', date: new Date},
    json4k: require('../files/4k.json'),
    mysqlExecute: mysqlExecute,

    query: {
        mysqlGet: 'select * from pet;'
    },

    getJsonCharactersCount: function (obj) {
        return JSON.stringify(obj).length
    }

};
