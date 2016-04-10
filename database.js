/**
 * Created by nathanlynch on 4/9/16.
 */
//This "object factory" returns a new object when database() is called. Don't use return statement if you want
//a static object
var mysql = require('mysql');
var q = require('q');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'clubhub'
});

module.exports = function() {
    return {
        getColumnDataByText: function(table, column, searchValue) {
            var deferred = q.defer();
            var columns = "";
            
            var query = "SELECT * FROM " + table + " WHERE " + column + "=" + "\'" + searchValue + "\'";
            console.log(query);
            connection.query(query, function(err, rows, fields) {
                if (!err)
                    deferred.resolve(rows);
                else
                    deferred.resolve("");
            });

            return deferred.promise;
        },
        createAccount: function(username, password) {
            var deferred = q.defer();
            
            var query = "INSERT INTO users (username, password) VALUES " + "(\'" + username + "\', \'" + password + "\')";
            
            connection.query(query, function(err) {
                if (!err)
                    deferred.resolve(true);
                else
                    deferred.resolve(false);
            });
            return deferred.promise;
        }
    }
}