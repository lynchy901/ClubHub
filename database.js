/**
 * Created by nathanlynch on 4/9/16.
 */
//This "object factory" returns a new object when movies() is called. Don't use return statement if you want
//a static object
var mysql      = require('mysql');
var q = require('q');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'clubhub'
});

module.exports = function() {
    return {
        getColumnDataByText: function(table, columnName, searchValue) {
            var deferred = q.defer();

            var query = "SELECT " + columnName + " FROM " + table + " WHERE " + columnName + "=" + "\'" + searchValue + "\'";
            console.log(query);
            connection.query(query, function(err, rows, fields) {
                if (!err)
                    deferred.resolve(rows);
                else
                    deferred.reject("Something went wrong");
            });
            return deferred.promise;
        }
    }
}