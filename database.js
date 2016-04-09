/**
 * Created by nathanlynch on 4/9/16.
 */
//This "object factory" returns a new object when movies() is called. Don't use return statement if you want
//a static object
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'clubhub'
});

module.exports = function() {
    return {
        getColumnDataByText: function(table, columnName, searchValue) {
            connection.connect();
            var query = "SELECT " + columnName + " FROM " + table + " WHERE " + columnName + "=" + "\'" + searchValue + "\'";
            console.log(query);
            connection.query(query, function(err, rows, fields) {
                if (!err)
                    console.log('The solution is: ', rows);
                else
                    console.log(err);
            });

            connection.end();        }
    }
}