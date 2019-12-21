var mysql = require('mysql');
var db = require(process.cwd() + '/includes/env/db.json');

/*  
    mysqlConnect():
    Function to create and return connection objects for MySQL Queries
    returns connection
*/
function mysqlConnect() {
    var connection = mysql.createConnection(db);
    return connection;
}

// module
function mysqlFunctions() {

    /*
        mysqlQuery():
        Queries the mysql database from the connection mysqlConnect. Returns
        the query array.
    */
    this.mysqlQuery = function(query) {
        return new Promise((res, rej) => {
            var con = mysqlConnect();

            con.connect((err) => {
                if (err) rej(err);
                con.query(query, function (err, result, fields) {
                    if (err) rej(err);

                    res(result);
                });
            });
        });
    }

}

module.exports = mysqlFunctions;