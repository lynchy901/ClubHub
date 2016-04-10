/**
 * Created by nathanlynch on 4/10/16.
 */
var Bcrypt = require('./node_modules/bcrypt');
var q = require('q');

module.exports = function() {
    var SALT_WORK_FACTOR = 10;

    return {
        encryptString: function(string) {
            var deferred = q.defer();

            Bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
                if(err) {
                    return console.error(err);
                }
                Bcrypt.hash(string, salt, function(err, hash) {
                    if(err) {
                        return console.error(err);
                    }
                    deferred.resolve(hash);
                });
            });
            return deferred.promise;
        },
    }
}