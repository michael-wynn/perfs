/**
 * Created on 10/2/15. Copyright Michael Wynn - all rights reserved.
 */
'use strict';
var Promise = require('bluebird');
var mysql = require('mysql2');
Promise.promisifyAll(require("mysql2/lib/pool").prototype);

class DB {
    constructor(config) {
        //default namedPlaceholders to true if not defined
        if(!config.hasOwnProperty('namedPlaceholders'))
            config.namedPlaceholders = true;
        this._pool = mysql.createPool(config);
        this.execute = this._createExec();
    }

    _getConnection(){
        return this._pool.getConnectionAsync()
            .then(function(connection){
                //attach custom promiser to connection object
                //(bluebird's promisify doesn't work well)
                connection.executeAsync = function (query, params){
                    return new Promise(function(resolve, reject){
                        connection.execute(query, params, function(err, data){
                            if(err)
                                reject(err);
                            else
                                resolve(data);
                        })
                    })
                } ;
                return connection;
            })
            .disposer(function (connection) {
                //attach disposer for resource management
                connection.release();
            })
    }

    _createExec(){
        var _this = this;
        return function _exec (query, params) {
            return Promise.using(_this._getConnection(), function(connection){
                return connection.executeAsync(query, params)
            })
        }

    }
}

module.exports = DB;
