mysqlFunctions = require(process.cwd() + '/includes/functions/mysqlFunctions')

module.exports = function(app) {
    
    // Establish the new functions container
    sql = new mysqlFunctions()

    app.post('/api/user/loginUser', function(request, response) {

        
        
        sql.mysqlQuery("SELECT * FROM vira.users")
            .then((res) => {
                response.send({
                    test_response: 'This is a test',
                    request: res
                });
            });

    });

}