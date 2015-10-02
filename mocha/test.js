/**
 * Created on 10/2/15. Copyright Michael Wynn - all rights reserved.
 */
'use strict';
var common = require('../lib/common');
var assert = require('assert');
var fs = require('fs');
var path = require('path');

var records = 10;

describe('Mysql tests', function (done) {

    //it('create and save insert params', function(){
    //    var n = 10, data = [];
    //    for (var i = 0; i < n; i++){
    //        data.push(common.mysql.createInsertParams());
    //    }
    //    fs.writeFileSync(path.join(process.cwd(), 'tests/isolated/mysql-insert/newRows.json'), JSON.stringify(data));
    //});

    it('Delete all', function(done){
        return common.mysql.deleteAll()
            .then(common.mysql.selectAll)
            .then(function(data){
                assert(data.length == 0, 'ensure empty database');
                done();
            })
            .catch(done);
    });

    it('Insert some rows', function (done) {
        return common.mysql.insertRow(records)
            .then(function(result){
                //console.log('Insert result: ', result)
                assert(Array.isArray(result), 'check result type');
                assert(result.length == records, 'check records inserted')
                done();
            })
            .catch(done);
    });

    it('Select all rows', function(done){
        return common.mysql.selectAll()
            .then(function(result){
                //console.log('\nselect results: ', result.length);
                assert(result.length == records, 'check records present in table')
                done();
            })
            .catch(done);
    })

    it('Delete all, again', function(done){
        return common.mysql.deleteAll()
            .then(common.mysql.selectAll)
            .then(function(data){
                assert(data.length == 0, 'ensure empty database');
                done();
            })
            .catch(done);
    });

})